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

const softDeleteProduct = async (req, res, next) => {
	try {
		const user = req.user;
		const productId = req.params.productId;
		
		const result = await productService.softDeleteProduct(user, productId)
		res.status(200).json({
			data: result
		})
	} catch (err){
		next(err)
	}
}

const getProduct = async (req, res, next) => {
	try {
		const productId = req.params.productId;
		
		const result = await productService.getProduct(productId)
		res.status(200).json({
			data: result
		})
	} catch (err){
		next(err)
	}
}

const searchProduct = async (req, res, next) => {
	try {
		const request = {
			product_name: req.query.product_name,
			product_category: req.query.product_category,
			page: req.query.page,
			size: req.query.size
		}
		const result = await productService.searchProduct(request)
		res.status(200).json({
			data: result.data,
			paging: result.paging
		})
	} catch (err) {
		next(err)
	}		
}

export default { createProduct, createProductPrice, softDeleteProduct, getProduct, searchProduct }