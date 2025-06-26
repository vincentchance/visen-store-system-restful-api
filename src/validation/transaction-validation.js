import Joi from 'joi';

const createTransactionValidation = Joi.object({
	items: Joi.array().items(
		Joi.object({
			product_id: Joi.string().max(60).required(),
			amount: Joi.number().positive().required()
		})
	).min(1).required()
})

export { createTransactionValidation }