import express from 'express';
import userController from '../controller/user-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const userRouter = express.Router();

userRouter.use(authMiddleware);

//user API
userRouter.post('/api/admin/current/user', userController.createUser);
userRouter.delete('/api/users/Logout', userController.logoutUser);

export { userRouter }