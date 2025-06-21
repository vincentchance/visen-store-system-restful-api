import productService from '../service/product-service.js'

const createProduct = async (req, res, next) => {
	try {
		const user = req.user;
		const request = req.body;
		
		const result = await productService.createProduct(user, request)
		res.status(201).json({
			data: result
		})
	} catch (err){
		next(err)
	}
}

const createProductPrice = async (req, res, next) => {
	try {
		const user = req.user;
		const productId = req.params.productId;
		const request = req.body;
		
		const result = await productService.createProductPrice(user, productId, request)
		res.status(201).json({
			data: result
		})
	} catch (err){
		next(err)
	}
}

export default { createProduct, createProductPrice }