import Joi from 'joi';

const createProductValidation = Joi.object({
	product_name: Joi.string().max(20).required(),
	product_category: Joi.string().max(20).required(),
	price: Joi.number().positive().required(),
	is_active: Joi.boolean().default(true)
})

const createPriceValidation = Joi.object({
	price: Joi.number().positive().required(),
	is_active: Joi.boolean().default(true)
})

const getProductValidation = Joi.string().max(80).required()

const getAllProductValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
	product_category: Joi.string().max(20).optional(),
	product_name: Joi.string().max(20).optional()
})

export { createProductValidation, createPriceValidation, getProductValidation, getAllProductValidation }