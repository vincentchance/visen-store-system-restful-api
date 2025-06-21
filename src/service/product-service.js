import {prismaClient} from '../application/database.js';
import {validate} from '../validation/validate.js';
import {createProductValidation, createPriceValidation } from '../validation/product-validation.js';
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
	if(user.role !== 'user'){
		throw new ResponseError(403, 'restricted access')
	}
	
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
			product_id: productId
		}
	})
	
	const updatedProduct = await prismaClient.product.findFirst({
		data: {
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
					is_active: true
				}
			}
		}
	})
	
	return updatedProduct
}

export default { createProduct, createProductPrice }