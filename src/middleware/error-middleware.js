import { ResponseError } from '../error/response-error.js';

const errorMiddleware = async (err, req, res, next ) => {
	if(!err){
		next();
		return;
	}

	//jika eroror berasal dari class ResponseError
	if (err instanceof ResponseError){
		res.status(err.status).json({
			errors: err.message
		}).end();
	} else {
		res.status(500).json({
			errors : err.message
		}).end();
	}
}

export { errorMiddleware }