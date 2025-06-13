import {prismaClient} from '../application/database.js';
import bcrypt from 'bcrypt';
import {logger} from '../application/logging.js';

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

const createUser = async () => {
	
}

export default { adminSetup }