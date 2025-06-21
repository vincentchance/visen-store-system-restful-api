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

export { createProductValidation, createPriceValidation }