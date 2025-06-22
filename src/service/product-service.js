import {prismaClient} from '../application/database.js';
import {validate} from '../validation/validate.js';
import {createProductValidation, createPriceValidation, getProductValidation } from '../validation/product-validation.js';
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

export default { createProduct, createProductPrice, softDeleteProduct }