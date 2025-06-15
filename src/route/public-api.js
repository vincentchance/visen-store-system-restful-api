import express from 'express';
import userController from '../controller/user-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const publicRouter = express.Router();

// login api
publicRouter.post('/api/users/login', userController.loginUser);

export { publicRouter } 