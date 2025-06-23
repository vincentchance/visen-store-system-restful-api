import {prismaClient} from '../application/database.js';
import {validate} from '../validation/validate.js';
import {createProductValidation, createPriceValidation, getProductValidation, getAllProductValidation } from '../validation/product-validation.js';
import {ResponseError} from '../error/response-error.js';

const createProduct = async (user, request) => {
	
	if(user.role !== 'admin'){
		throw new ResponseError(403, 'restricted access')
	}
	
	const product = validate(createProductValidation, request);
	
	const productCreate = await prismaClient.product.create({
		data: {
			product_name: product.product_name,
			product_category: product.product_category,
			prices: {
				create: {
					price: product.price,
					start_date: new Date(),
					is_active: true
				}
			}
		},
		select: {
			id: true,
			product_name: true,
			product_category: true,
			prices: {
				where: {
					is_active: true
				},
				select: {
					id: true,
					price: true,
					start_date: true,
					is_active: true
				}
			}
		}
	})
	
	return productCreate;
}

const createProductPrice = async (user, productId, request) => {
	
	const productPrice = validate(createPriceValidation, request)
	
	const product = await prismaClient.product.findFirst({
		where: {
			id: productId
		},
		include:{
			prices: true
		}
	});
	
	if(!product){
		throw new ResponseError(404, 'product not found')
	}
	
	if(product.prices && product.prices.length > 0){
		await prismaClient.price.updateMany({
			where: {
				product_id: productId,
				is_active: true
			},
			data: {
				is_active: false
			}
		})
	}
	
	const price = await prismaClient.price.create({
		data: {
			price: productPrice.price,
			start_date: new Date(),
			is_active: true,
			product_id: productId,
			created_by: user.username
		}
	})
	
	const updatedProduct = await prismaClient.product.findFirst({
		where: {
			id: productId
		},
		select: {
			id: true,
			product_name: true,
			product_category: true,
			prices: {
				where: {
					is_active: true
				},
				select: {
					id: true,
					price: true,
					start_date: true,
					is_active: true,
					created_by: true
				}
			}
		}
	})
	
	return updatedProduct
}

const softDeleteProduct = async (user, productId) => {
	
	productId = validate(getProductValidation, productId)
	
	const product = await prismaClient.product.findFirst({
		where: {
			id: productId,
			deleted_at: null,
			deleted_by: null
		},
		include:{
			prices: {
				where: {
					deleted_at: null,
					deleted_by: null
				}
			}
		}
	});
	
	
	if(!product){
		throw new ResponseError(404, 'product not found')
	}
	
	return await prismaClient.$transaction(async(prisma) => {
		await prisma.product.update({
			where: {
				id: productId,
			},
			data: {
				deleted_at: new Date(),
				deleted_by: user.username
			}
		});
		
		await prisma.price.updateMany({
			where: {
				product_id: productId,
				deleted_at: null
			},
			data: {
				deleted_at: new Date(),
				deleted_by: user.username,
			}
		})
		
		return await prisma.product.findFirst({
			where: {
				id: productId
			},
			select: {
				id: true,
				product_name: true,
				product_category: true,
				prices: {
					where: {
						is_active: true
					},
					select: {
						id: true,
						price: true,
						start_date: true,
						is_active: true,
						created_by: true,
						deleted_at: true,
						deleted_by: true
					}
				},
				deleted_at: true,
				deleted_by: true
			}	
		})
	})
	
}


const getProduct = (productId) => {
	productId = validate(getProductValidation, productId)
	
	const product = await prismaClient.product.findFirst({
		where: {
			id: productId,
			deleted_at: null
		},
		select: {
			id: true,
			product_name: true,
			product_category: true,
			prices: {
				where: {
					is_active: true,
					deleted_at: null
				},
				select: {
					id: true,
					price: true,
					start_date: true,
					is_active: true,
					created_by: true,
				}
			},
		}	
	});
	
	if(!product){
		throw new ResponseError(404, "product not found or data has been deleted")
	}
	
	return product
}

const SearchProduct = (request) => {
	
	request = validate(getAllProductValidation, request)
	
	logger.info(request)
	//  page 1 - 1 = 0 size = 10 * 0  
	//  page 2 - 1 = 1 size = 10 * 1 = 10 
	const skip = ( request.page  - 1) * request.size
	
	const filters = []
	
	if(request.product_name){
		filters.push({
			product_name: {
				  contains: request.product_name,
				  mode: "insensitive" // agar tidak case-sensitive
				}
			});
		}
	if(request.product_category){
		filters.push({
			product_category: {
				contains: request.product_category,
				mode: "insensitive"
			}
		});
	}
	
	const products = await prismaClient.product.findMany({
		where: {
			AND: [
				{ deleted_at: null },
				...filters
			]
			
		},
		take: request.size,
		skip: skip,
		select: {
			id: true,
			product_name: true,
			product_category: true,
			prices: {
				where: {
					is_active: true,
					deleted_at: null
				},
				select: {
					price: true
				},
				take: 1 // hanya ambil 1 harga aktif (terbaru)
			}
		}
	})
	
	const mappedProducts = products.map(product => ({
		id: product.id,
		product_name: product.product_name,
		product_category: product.product_category,
		price: product.prices[0]?.price ?? null
	}));

	const totalItems = await prismaClient.product.count({
		where: {
			AND: [
				{ deleted_at: null },
				...filters
			]
		}
	});
	
	return {
		data: mappedProducts, 
		paging: {
			page: request.page,
			total_item: totalItems,
			total_page: Math.ceil(totalItems/ request.size)
			
		}
	}
}

export default { createProduct, createProductPrice, softDeleteProduct, geProduct, SearchProduct}