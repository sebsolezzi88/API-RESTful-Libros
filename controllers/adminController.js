import Book from '../Models/Book.js'
import User from '../Models/User.js';

//Obtener todos los libros
export const getAllBooks = async (req , res )=>{
    try {
        const books = await Book.findAll({
            include: {
                model: User,
                as: 'user',
                attributes: ['id','username'] 
            }
        });
        
        if (books.length === 0) {
            return res.json({
                status: 'success',
                message: 'No books found',
                books: []
            });
        }

        return res.json({
            status: 'success',
            message: 'Books retrieved successfully',
            books
        });
    } catch (error) {
        console.log(error)
          return res.status(500).json({status:'error', message:'internal server error',error});
    }
}

export const deleteAnyUser = async (req , res )=>{
    try {
        const userId = req.params.id;
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