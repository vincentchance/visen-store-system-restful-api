import { prismaClient } from '../application/database.js';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
	const token = req.get('Authorization');
    if(!token){
       res.status(401).json({ errors: 'Unauthorized' }).end();
    }
    
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

        const user = await prismaClient.user.findFirst({
            where: { 
				id: decoded.id
			},
			select: {
				id: true,
				username: true,
				role: true
			}
        });
        req.user = {
            id: user.id,
            username: user.username,
            role: user.role
        };
        next();
        
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
}