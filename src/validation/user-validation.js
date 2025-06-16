import Joi from 'joi';

const createUserValidation = Joi.object({
	name: Joi.string().max(50).required(),
	username: Joi.string().max(20).required(),
	password: Joi.string().max(50).required(),
	role: Joi.string().valid('user').default('user')
});

const loginUserValidation = Joi.object({
	username: Joi.string().max(20).required(),
	password: Joi.string().max(50).required()
});

const getUserValidation = Joi.string().max(80).required()

export { createUserValidation, loginUserValidation, getUserValidation }