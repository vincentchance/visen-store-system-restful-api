import express from 'express';
import userController from '../controller/user-controller.js';
import productController from  '../controller/product-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const userRouter = express.Router();

userRouter.use(authMiddleware);

//user API
userRouter.post('/api/admin/current/user', userController.createUser);
userRouter.delete('/api/users/logout', userController.logoutUser);
userRouter.get('/api/users/current', userController.getUser);
userRouter.patch('/api/users/current', userController.updateUser);

//product API
userRouter.post('/api/admin/product', productController.createProduct);
userRouter.post('/api/product/:productId/price', productController.createProductPrice);
userRouter.patch('/api/product/:productId/softdelete', productController.softDeleteProduct);
userRouter.get('/api/product/:productId', productController.getProduct);
userRouter.get('/api/product', productController.searchProduct);

export { userRouter }