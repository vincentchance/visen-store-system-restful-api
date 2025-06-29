import {prismaClient} from '../application/database.js';
import { validate } from '../validation/validate.js';
import { ResponseError } from '../error/response-error.js';
import { createUserValidation, loginUserValidation, getUserValidation, updateUserValidation } from '../validation/user-validation.js';
import {logger} from '../application/logging.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminSetup = async () => {
	const admin = {
		name: process.env.ADMIN_NAME,
		username: process.env.ADMIN_USERNAME,
		password: process.env.ADMIN_PASSWORD,
		role: process.env.ADMIN_ROLE
	}
		
		const adminExist = await prismaClient.user.findFirst({
			where: { role: 'admin' }
		});
		
		if(adminExist){
			logger.info('Admin already exists, skipping creation.');
			return;
		}
		
		const hashedPassword = await bcrypt.hash(admin.password, 10);

		const newAdmin = await prismaClient.user.create({
			data: {
				name: admin.name,
				username: admin.username,
				password: hashedPassword,
				role: admin.role
			}
		});
		
	return newAdmin;
}

const createUser = async (user, request) => {
	
	if(user.role !== 'admin'){
		throw new ResponseError(403, 'Restricted access')
	}
	
	request = validate(createUserValidation, request);
	
	const userExist = await prismaClient.user.findFirst({
		where: { username: request.username, name: request.name }
	});
	
	if(userExist){
		throw new ResponseError(409, 'account conflict: this account already exist');
	}
	
	const hashedPassword = await bcrypt.hash(request.password, 10);
	
	const newUser = await prismaClient.user.create({
		data: {
			name: request.name,
			username: request.username,
			password: hashedPassword,
			role: request.role
		}
	})
	
	return newUser;
}

const loginUser = async (request) => {
	const loginRequest = validate(loginUserValidation, request);
	
	const user = await prismaClient.user.findFirst({
        where: {
            username: loginRequest.username
        },
        select: {
			id: true,
            username: true,
            password: true,
			role: true
        }
    });
	


    if (!user) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
	
	
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const token = jwt.sign(
	{
		id: user.id,
		username: user.username,
		role: user.role
	}, process.env.JWT_SECRET,
	{
		expiresIn: '1d'
	})
	
    return {
		token: token
	}
}

const updateUser = async(request) => {
	
	const user = validate(updateUserValidation, request);
	
	const userExist = await prismaClient.user.findUnique({
		where: {
			username: user.username
		}
	})
	
	if(!userExist){
		throw new ResponseError(404, "user not found")
	}
	
	const data = {}
	if(user.name){
		data.name = user.name
	}
	if(user.password){
		data.password = await bcrypt.hash(user.password, 10)
	}
	
	return await prismaClient.user.update({
		where: {
			username: user.username
		},
		data: data,
		select: {
			username: true,
			name: true
		}
	})
}

const getUser = async(id) => {
	id = validate(getUserValidation, id);
	
	const user = await prismaClient.user.findFirst({
		where: {
			id: id
		},
		select: {
			id: true,
			username: true,
			name: true,
			role: true
		}
	})
	
	if(!user){
		throw new ResponseError(404, 'user not found')
	}
	
	return user;
}

const logoutUser = async (id) => {
    id = validate(getUserValidation, id);

    const user = await prismaClient.user.findFirst({
        where: {
			id: id
        }
    });

    if (!user) {
        throw new ResponseError(404, "user not found");
    }

  return {
	  data: 'Ok'
  }
}



export default { adminSetup, getUser, createUser, updateUser, loginUser, logoutUser }