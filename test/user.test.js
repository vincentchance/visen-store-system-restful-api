import supertest from 'supertest';
import {web} from '../src/application/web.js';
import { prismaClient } from '../src/application/database.js';
import { logger } from '../src/application/logging.js';
import { createTestUser, removeAllTestUser1, removeAllTestUser, getTestUser, createTestAdmin } from './test-utils.js';
import bcrypt from 'bcrypt';

describe('POST /api/users/login', function () {
	beforeEach( async () => {
		await createTestUser();
	});
	
	afterEach( async () => {
		await removeAllTestUser();
	})
	
	it('should can login', async () => {
		const result = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "test",
			password:  "rahasia"
		})
		
		logger.info(result.body);
		
		expect(result.status).toBe(200);
		expect(result.body.data.token).toBeDefined();
	})
})


describe('GET /api/users/current', function () {
	
	beforeEach( async () => {
		await createTestUser();
	});
	
	afterEach( async () => {
		await removeAllTestUser();
	})
	
	it('should get user', async () => {
		let authToken;
		const loginResponse = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "test",
			password:  "rahasia"
		})
		
		
		expect(loginResponse.status).toBe(200);
		expect(loginResponse.body.data.token).toBeDefined()
		authToken = loginResponse.body.data.token;
		
        const getUser = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', `Bearer ${authToken}`)
		
		expect(getUser.status).toBe(200);
		expect(getUser.body.data.username).toBe('test');
		expect(getUser.body.data.name).toBe('test');
		expect(getUser.body.data.role).toBe('user');
		
	})
})


describe('DELETE /api/users/logout', function () {
	beforeEach( async () => {
		await createTestUser();
	});
	
	afterEach( async () => {
		await removeAllTestUser();
	})
	
	it('should can logout', async () => {
		let authToken;
		const loginResponse = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "test",
			password:  "rahasia"
		})
		
		
		expect(loginResponse.status).toBe(200);
		expect(loginResponse.body.data.token).toBeDefined()
		authToken = loginResponse.body.data.token;
		
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', `Bearer ${authToken}`)
		
        expect(result.status).toBe(200);
        expect(result.body.data).toBe("Ok");
    });
})


describe('POST /api/admin/current/user', function () {
	beforeEach( async () => {
		await createTestAdmin();
	});
	
	afterEach( async () => {
		await removeAllTestUser();
		await removeAllTestUser1();
	})
	
	it('should can create user if admin created it', async () => {
		let authToken;
		const loginResponse = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "test",
			password:  "rahasia"
		})
		
		
		expect(loginResponse.status).toBe(200);
		expect(loginResponse.body.data.token).toBeDefined()
		authToken = loginResponse.body.data.token;
		
		const createUser = await supertest(web)
			.post('/api/admin/current/user')
			.set('Authorization', `Bearer ${authToken}`)
			.send({
				name: "test1",
				username: "test1",
				password: "rahasia12",
				role: "user"
			})
		
		
        expect(createUser.status).toBe(201);
        expect(createUser.body.data.name).toBe("test1");
		expect(createUser.body.data.username).toBe("test1");
		expect(createUser.body.data.password).not.toBe("rahasia12");
		expect(createUser.body.data.role).toBe("user");
	})
})

describe('PATCH api/users/current', function () {
	beforeEach( async () => {
		await createTestAdmin();
	});
	
	afterEach( async () => {
		await removeAllTestUser();
		await removeAllTestUser1();
	})
	
	it('should can update admin account', async () => {
		let authToken;
		const loginResponse = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "test",
			password:  "rahasia"
		})
		
		
		expect(loginResponse.status).toBe(200);
		expect(loginResponse.body.data.token).toBeDefined()
		authToken = loginResponse.body.data.token;
		
		const updateUser = await supertest(web)
			.patch('/api/users/current')
			.set('Authorization', `Bearer ${authToken}`)
			.send({
				name: "test1",
				password: "rahasia12"
			})
		
		logger.info(updateUser.body)
		
        expect(updateUser.status).toBe(200);
        expect(updateUser.body.data.name).toBe("test1");
		expect(updateUser.body.data.username).toBe("test");
		
		const user = await getTestUser();
		expect(await bcrypt.compare('rahasia12',user.password)).toBe(true);
	})
})