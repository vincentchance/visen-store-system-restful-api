import supertest from 'supertest';
import {prismaClient} from '../src/application/database.js';
import {logger} from '../src/application/logging.js';
import {web} from '../src/application/web.js';
import { createTestUser, removeAllTestUser1, getTestProduct, removeAllTestUser, createTestProduct, getTestUser, createTestAdmin, removeAllTestProduct } from './test-utils.js';

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
		expect(login.body.token).toBeDefined();
		authToken = login.body.token
		
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
		expect(login.body.token).toBeDefined();
		authToken = login.body.token
		
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
		expect(login.body.token).toBeDefined();
		authToken = login.body.token
		
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
