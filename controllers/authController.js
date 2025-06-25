import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

dotenv.config();

//obtemos la palabra secreta de las variable de entorno
const JWT_SECRET = process.env.JWT_SECRET;

//roles validos
const validRoles = ["admin", "user"];


export const registerUser = async (req, res) => {
     const {username,password,password2,role} = req.body;
      
      //comprobar username
      if(username.trim()==="" || password.trim() === '' ){
        return res.status(400).json({status:'error', message:'username required'});
      }
      //comprobar passwords
      if(password !== password2){
        return res.status(400).json({status:'error', message:'passwords must match'});
      }
      
      //comprobamos que no exista ese userneme
      const userExists = await User.findOne({where:{username}});
      if(userExists){
        return res.status(400).json({status:'error', message:'username already in use'});
      }
    
      try {
        //Aseguramos el role si el usuario, no manda nada o si pone otras palabras
        const assignedRole = validRoles.includes(role) ? role : "user";
        const passwordHash = await bcrypt.hash(password,10);
         /*Forzamos el tipo UserCreationAttributes por que typescrip queria obligatorioamene
         el campo ID  */
        User.create(
          {username,
          password:passwordHash,
          role: assignedRole
          }) 
          return res.status(201).json({status:'success', message:'user created successfully'});
      } catch (error) {
         return res.status(500).json({status:'error', message:'internal server error'});
      }
}

export const loginUser = async (req,res) =>{
    const {username,password} = req.body;
        if(username === '' || password === ''){
          return res.status(400).json({status:'error', message:'username or password required'});
        }
      try {
        const userExists = await User.findOne({where:{username}});
    
        if(!userExists){
          return res.status(400).json({status:'error', message:'username not found'});
        }
        
        if(!await bcrypt.compare(password,userExists.password)){
          return res.status(400).json({status:'error', message:'invalid credentials'});
        }
        //Si los password coincide generamos el token
        const payload = {
          id: userExists.id,
          username: userExists.username,
          role: userExists.role,
        }
        
        const token = jwt.sign(payload,JWT_SECRET,{ expiresIn: '1h' } ); 
        return res.status(201).json({status:'success', token})
    
      } catch (error) {
         return res.status(500).json({status:'error', message:'internal server error'});
      }
}

export const deleteUserAccount = async (req,res)=>{
  const userId = req.user.id;

  try {
    // Solo el usuario puede eliminarse a sí mismo 
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    await user.destroy(); 
    return res.status(200).json({ status: 'success', message: 'User account deleted' });
  } catch (error) {
    console.error('Error deleting account:', error);
    return res.status(500).json({ status: 'error', message: 'Error deleting account' });
  }
}