import Book from '../Models/Book.js'

//Obtener todos los libros
export const getAllBooks = async (req , res )=>{
    try {
        const books = await Book.findAll();
        
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
          return res.status(500).json({status:'error', message:'internal server error',error});
    }
}

export const deleteAnyUser = async (req , res )=>{
    
}