import {prismaClient} from '../application/database.js';
import { validate } from '../validation/validate.js';
import { ResponseError } from '../error/response-error.js';
import { createUserValidation, loginUserValidation } from '../validation/user-validation.js';
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
	
	if(user.role === 'user'){
		throw new ResponseError(403, 'Restricted access')
	}
	
	request = validate(createUserValidation, request);
	
	const userExist = await prismaClient.user.findFirst({
		where: { username: request.username, name: request.name }
	});
	
	if(userExist){
		throw new ResponseError(409, 'account conflict: this account already exist');
	}
	
	const hashedPassword = await bcrypt.hash(request.password);
	
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
	
    return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            id: user.id
        },
        select: {
            token: true
        }
    });
}



export default { adminSetup, createUser, loginUser }