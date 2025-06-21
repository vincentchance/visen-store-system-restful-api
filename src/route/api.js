import express from 'express';
import userController from '../controller/user-controller.js';
import productController from  '../controller/product-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const userRouter = express.Router();

userRouter.use(authMiddleware);

//user API
userRouter.post('/api/admin/current/user', userController.createUser);
userRouter.delete('/api/users/Logout', userController.logoutUser);
userRouter.get('/api/users/current', userController.getUser);

//product API
userRouter.post('/api/admin/product', productController.createProduct);
userRouter.post('/api/admin/product/:productId/price', productController.createProductPrice)

export { userRouter }