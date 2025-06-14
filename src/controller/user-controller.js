import userService from '../service/user-service.js';

const createUser = async ( req, res, next ) => {
	try {
		const user = req.user;
		const request = req.body;
	
		const result = await userService.createUser(user, request)
		res.status(201).json({
			data: result
		})
	} catch (err){
		next(err)
	}
}

const loginUser = async (req, res, next) => {
	try {
		const request = req.body;
		const result = await userService.loginUser(request)
		res.status(200).json({
			token: result.token
		})
	} catch (err){
		next(err)
	}
}

export default { createUser, loginUser }