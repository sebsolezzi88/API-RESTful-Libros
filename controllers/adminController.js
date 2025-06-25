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

/* Obteneer todos los libros de un usuario */
export const getAllBooksFromUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const books = await Book.findAll({ where: { userId } });

        if (books.length === 0) {
            return res.json({
                status: 'success',
                message: 'No books found for this user',
                books: []
            });
        }

        return res.json({
            status: 'success',
            message: 'Books retrieved successfully',
            books
        });
    } catch (error) {
        console.error('Error al obtener libros del usuario:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Error retrieving books'
        });
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