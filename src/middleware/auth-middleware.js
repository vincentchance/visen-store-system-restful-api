import { prismaClient } from '../application/database.js';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
	const token = req.get('Authorization');
	if(!token){
		res.status(401).json({
			errors: 'unauthorized'
		}).end()
	} else {
		
		jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, async (err, decoded) => {
			
			if (err) {
			  return res.status(401).json({ error: 'Invalid token' });
			}
			
			const user = await prismaClient.user.findUnique({
			  where: { id: decoded.id },
			});
			if(!user){
				res.status(401).json({
					errors: 'unauthorized'
				}).end() 
			} else {
				req.user = decoded
				next();
			}
		});
	}	
}