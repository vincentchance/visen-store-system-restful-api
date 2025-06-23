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

export const getTestProduct = async () => {
	return prismaClient.product.findUnique({
		where: {
			product_name: "lifebuoy"
		},
		select: {
			id: true,
			product_name: true,
			product_category: true,
			prices: {
				where: {
					is_active: true
				},
				select: {
					id: true,
					price: true,
					start_date: true,
					is_active: true
				}
			}
		}
	})
}

export const createTestProduct = async () => {
	await prismaClient.product.create({
		data: { 
			product_name: "lifebuoy",
			product_category: "sabun mandi",
			prices: {
				create: {
					price: 5000,
					start_date: new Date(),
					is_active: true
				}
			}
		}
	})
}


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

export const removeAllTestProduct = async () => {
    await prismaClient.product.deleteMany({
        where: {
            product_name: "lifebuoy"
        }
    });
};

