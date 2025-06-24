import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Models/User.js';

dotenv.config();

//obtemos la palabra secreta de las variable de entorno
const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next )=>{
    
    /* 1.Obtener el token de los headers de la solicitud 
        Comúnmente viene en el header 'Authorization' con el prefijo 'Bearer '
    */
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ status:'error' ,message: 'token not provided' });
    }
    try {
        //2. Verificar validad del token
        const decoded = jwt.verify(token,JWT_SECRET);
        
        //3. Verificar si el usuario está en la base de datos
        const userExits = await User.findOne({ where: { id: decoded.id, username: decoded.username } })
        if (!userExits) {
            return res.status(401).json({ status: 'error', message: 'Usuario no válido' });
        }
        //Si todo es correcto continua a bookController
        
        
        req.user ={
            id: userExits.id,
            username: userExits.username,
            role: userExits.role
        } 
        
        next();
    } catch (error) {
         return res.status(500).json({status:'error', message:'internal server error',error});
    }
}