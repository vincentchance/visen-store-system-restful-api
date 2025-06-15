import supertest from 'supertest';
import {web} from '../src/application/web.js';
import { prismaClient } from '../src/application/database.js';
import { logger } from '../src/application/logging.js';
import bcrypt from 'bcrypt';

describe('POST /api/users/login', function () {
	it('should can login', async () => {
		const result = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "admin-visen",
			password:  "rahasia"
		})
		console.log(result);
		logger.info(result.status);
		
		expect(result.status).toBe(200);
		expect(result.body.token).toBeDefined();
	})
})