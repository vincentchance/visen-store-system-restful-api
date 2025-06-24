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
			data: result
		})
	} catch (err){
		next(err)
	}
}

const getUser = async (req, res, next) => {
	try{
		const id = req.user.id
		const result = await userService.getUser(id)
		res.status(200).json({
			data: result
		})
	} catch (err){
		next(err)
	}
}

const logoutUser = async (req, res, next) => {
	try {
		const id = req.user.id
		const result = await userService.logoutUser(id)
		res.status(200).json({
			data: result.data
		})
	} catch (err) {
		next(err)
	}
}

export default { createUser, loginUser, logoutUser, getUser }