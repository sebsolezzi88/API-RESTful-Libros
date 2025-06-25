export const isAdmin = (req,res) =>{
    
    try {
        //Comprobar si el usuario es un 'admin'
        if(req.user.role !== 'admin'){
            return res.status(403).json({ status: 'error', message: 'forbidden' });
        }
        
        next();
    } catch (error) {
         return res.status(500).json({status:'error', message:'internal server error',error});
    }
}
