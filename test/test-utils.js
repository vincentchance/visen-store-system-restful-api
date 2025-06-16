import {prismaClient} from '../src/application/database.js';
import bcrypt from 'bcrypt';

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
			role: "user",
        }
    });
};

export const createTestAdmin = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
			role: "admin",
        }
    });
};


export const getTestUser = async () => {
	return prismaClient.user.findUnique({
		where: {
			username: "test"
		}
	})
}

export const removeAllTestUser1 = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test1"
        }
    });
};

export const removeAllTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    });
};

