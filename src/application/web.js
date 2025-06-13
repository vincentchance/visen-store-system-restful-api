import express from 'express';
import { errorMiddleware } from '../middleware/error-middleware.js'

export const web = express();

web.use(errorMiddleware);
