import supertest from 'supertest';
import {prismaClient} from '../src/application/database.js';
import {logger} from '../src/application/logging.js';
import {web} from '../src/application/web.js';
import { createTestUser, removeAllTestUser1, getTestProduct, removeAllTestUser, removeManyTestProduct, createTestProduct, createManyTestProduct, getTestUser, createTestAdmin, removeAllTestProduct } from './test-utils.js';

describe('POST /api/admin/product', function () {
	beforeEach( async () => {
		await createTestAdmin();
	});
	
	afterEach( async () => {
		await removeAllTestProduct();
		await removeAllTestUser();
	})
	
	it('should can create product', async () => {
		let authToken;
		const login = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "test",
			password:  "rahasia"
		})
		
		logger.info(login.body);
		
		expect(login.status).toBe(200);
		expect(login.body.data.token).toBeDefined();
		authToken = login.body.data.token
		
		const result = await supertest(web)
		.post('/api/admin/product')
		.set('Authorization', `Bearer ${authToken}`)
		.send({
			product_name: "lifebuoy",
			product_category: "sabun mandi",
			price: 5000,
			is_active: true
		})
		
		logger.info(result.body)
		
		expect(result.status).toBe(201);
		expect(result.body.data.product_name).toBe("lifebuoy");
		expect(result.body.data.product_category).toBe("sabun mandi");
		expect(result.body.data.prices).toBeDefined();
		expect(result.body.data.prices[0].price).toBe(5000);
		expect(result.body.data.prices[0].is_active).toBe(true);
		expect(result.body.data.prices[0].start_date).toBeDefined();
	})
})

describe('POST /api/admin/product', function () {
	beforeEach( async () => {
		await createTestUser();
	});
	
	afterEach( async () => {
		await removeAllTestProduct();
		await removeAllTestUser();
	})
	
	it('should reject because restricted access', async () => {
		let authToken;
		const login = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "test",
			password:  "rahasia"
		})
		
		logger.info(login.body);
		
		expect(login.status).toBe(200);
		expect(login.body.data.token).toBeDefined();
		authToken = login.body.data.token
		
		const result = await supertest(web)
		.post('/api/admin/product')
		.set('Authorization', `Bearer ${authToken}`)
		.send({
			product_name: "lifebuoy",
			product_category: "sabun mandi",
			price: 5000,
			is_active: true
		})
		
		logger.info(result.body)
		
		expect(result.status).toBe(403);
		
	})
})

describe('POST /api/product/:productId/price', function () {
	beforeEach( async () => {
		await createTestAdmin();
		await createTestProduct();
	});
	
	afterEach( async () => {
		await removeAllTestProduct();
		await removeAllTestUser();
	})
	
	it('should can update new price', async () => {
		let authToken;
		const login = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "test",
			password:  "rahasia"
		})
		
		logger.info(login.body);
		
		expect(login.status).toBe(200);
		expect(login.body.data.token).toBeDefined();
		authToken = login.body.data.token
		
		const testProduct = await getTestProduct();
		
		const result = await supertest(web)
		.post(`/api/product/${testProduct.id}/price`)
		.set('Authorization', `Bearer ${authToken}`)
		.send({
			price: 6000,
			is_active: true
		})
		
		logger.info(result.body)

		expect(result.status).toBe(201);
		expect(result.body.data.product_name).toBe("lifebuoy");
		expect(result.body.data.product_category).toBe("sabun mandi");
		expect(result.body.data.prices).toBeDefined();
		expect(result.body.data.prices[0].price).toBe(6000);
		expect(result.body.data.prices[0].is_active).toBe(true);
		expect(result.body.data.prices[0].start_date).toBeDefined();
		expect(result.body.data.prices[0].created_by).toBe("test")
	})
})


describe('PATCH /api/product/:productId/softdelete', function () {
	beforeEach( async () => {
		await createTestAdmin();
		await createTestProduct();
	});
	
	afterEach( async () => {
		await removeAllTestProduct();
		await removeAllTestUser();
	})
	
	it('should can update soft delete', async () => {
		let authToken;
		const login = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "test",
			password:  "rahasia"
		})
		
		logger.info(login.body);
		
		expect(login.status).toBe(200);
		expect(login.body.data.token).toBeDefined();
		authToken = login.body.data.token
		
		const testProduct = await getTestProduct();
		
		const result = await supertest(web)
		.patch(`/api/product/${testProduct.id}/softdelete`)
		.set('Authorization', `Bearer ${authToken}`)
		
		logger.info(result.body)
		
		expect(result.status).toBe(200);
		expect(result.body.data.deleted_at).toBeDefined();
		expect(result.body.data.deleted_by).toBeDefined();
		expect(result.body.data.prices).toBeDefined();
		expect(result.body.data.prices[0].deleted_by).toBeDefined();
		expect(result.body.data.prices[0].deleted_by).toBeDefined();
	})
})

describe('GET /api/product', function () {
	beforeEach( async () => {
		await createTestAdmin();
		await createManyTestProduct();
	}, 15000);
	
	afterEach( async () => {
		await removeManyTestProduct();
		await removeAllTestUser();
	}, 15000)
	
	it('should get 10 product list', async () => {
		let authToken;
		const login = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "test",
			password:  "rahasia"
		})
		
		logger.info(login.body);
		
		expect(login.status).toBe(200);
		expect(login.body.data.token).toBeDefined();
		authToken = login.body.data.token
		
		const testProduct = await getTestProduct();
		
		const result = await supertest(web)
		.get(`/api/product`)
		.set('Authorization', `Bearer ${authToken}`)

		logger.info(result.body);
		expect(result.status).toBe(200);
		
		expect(result.body.data.length).toBe(10);
		expect(result.body.paging.page).toBe(1);
		expect(result.body.paging.total_item).toBe(16);
		expect(result.body.paging.total_page).toBe(2);
	})
	
	it('should turn into page 2', async () => {
		let authToken;
		const login = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "test",
			password:  "rahasia"
		})
		
		logger.info(login.body);
		
		expect(login.status).toBe(200);
		expect(login.body.data.token).toBeDefined();
		authToken = login.body.data.token
		
		const testProduct = await getTestProduct();
		
		const result = await supertest(web)
		.get(`/api/product`)
		.query({
			page: 2
		})
		.set('Authorization', `Bearer ${authToken}`)

		logger.info(result.body);
		expect(result.status).toBe(200);
		
		expect(result.body.data.length).toBe(6);
		expect(result.body.paging.page).toBe(2);
		expect(result.body.paging.total_item).toBe(16);
		expect(result.body.paging.total_page).toBe(2);
	})
	
	it('should get query result lifebuoy0', async () => {
		let authToken;
		const login = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "test",
			password:  "rahasia"
		})
		
		logger.info(login.body);
		
		expect(login.status).toBe(200);
		expect(login.body.data.token).toBeDefined();
		authToken = login.body.data.token
		
		const testProduct = await getTestProduct();
		
		const result = await supertest(web)
		.get(`/api/product`)
		.query({
			product_name: "lifebuoy0"
		})
		.set('Authorization', `Bearer ${authToken}`)

		logger.info(result.body);
		expect(result.status).toBe(200);
		
		expect(result.body.data[0].product_name).toBe("lifebuoy0");
		expect(result.body.data.length).toBe(1);
		expect(result.body.paging.page).toBe(1);
		expect(result.body.paging.total_item).toBe(1);
		expect(result.body.paging.total_page).toBe(1);
	})
})
