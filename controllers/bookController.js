import {Op,fn,col} from 'sequelize';
import Book from "../Models/Book.js";


/* req.user ={
            id: userExits.id,
            username: userExits.username,
            role: userExits.role
        }  */
  const validCategories = [
    'fiction',
    'non-fiction',
    'fantasy',
    'science',
    'history',
    'biography',
    'romance',
    'mystery',
    'horror',
    'self-help',
    'philosophy',
    'technology',
    'poetry',
    'comics'
  ];
/* Solo los usuarios registrados y admins puede crear libros*/
export const addBook = async (req, res) => {
  const { bookname, author, category } = req.body;
  const { id } = req.user;

  // Lista de categorías válidas (debe coincidir con las del modelo Book)


  // Validaciones básicas
  if (!bookname?.trim() || !author?.trim()) {
    return res.status(400).json({ status: 'error', message: 'book name and author are required'});
  }

  if (!validCategories.includes(category)) {
    return res.status(400).json({status: 'error', message: `invalid category. Must be one of: ${validCategories.join(', ')}`});
  }

  try {
    // Verificar si el mismo libro ya fue guardado por el mismo usuario
    const existingBook = await Book.findOne({where: { bookname, userId: id }});

    if (existingBook) {
      return res.status(409).json({status: 'error', message: 'you already saved this book.'});
    }

    // Guardar el libro en la base de datos
    await Book.create({ bookname, author, category, userId: id });

    return res.status(201).json({status: 'success', message: 'Book added successfully'});
  } catch (error) {
    return res.status(500).json({status: 'error',message: 'Internal server error',error });
  }
}

/* Solo el usuario que lo creo y el admin pueden cambiar nombre y autor*/
export const changeNameAuthorCategoryBook = async (req,res) =>{
    const  {bookname, author,category} = req.body;
    const idBook = req.params.id;
    const idUser = req.user.id;

    if(bookname.trim() === '' || author.trim() === ''){
          return res.status(400).json({status:'error', message:'bookname or author required'});
    }

    if (!validCategories.includes(category)) {
    return res.status(400).json({status: 'error', message: `invalid category. Must be one of: ${validCategories.join(', ')}`});
    }

    try {
        //buscar el libro
        const bookExist = await Book.findOne({where:{id:idBook}});
        
        if (!bookExist) {
            return res.status(404).json({status:'error', message:'book not found'});
        }
        //Consultar por si el user creo la publicacion o si es admin
        if (bookExist.userId !== idUser && req.user.role !== 'admin') {
            return res.status(403).json({ status:'error', message: 'you do not have permission to update this book.' });
        }
        
        // Editar los campos
        bookExist.bookname = bookname;
        bookExist.author = author;
        bookExist.category = category;
        
        //guardar cambios
        await bookExist.save()

        return res.status(200).json({ status:'success', message: 'successfully update book' });
        
    } catch (error) {
        return res.status(500).json({status:'error', message:'internal server error', err:error});
    }
}

/* Solo el usuario que lo creo y el admin pueden borrarlos*/
export const deleteBook = async (req,res) =>{
    const idBook = req.params.id;
    const idUser = req.user.id;
    
    try {
        //buscar el libro
        const bookExist = await Book.findOne({where:{id:idBook}});
        
        if (!bookExist) {
            return res.status(404).json({status:'error', message:'book not found'});
        }
        //Consultar por si el user creo la publicacion o si es admin
        if (bookExist.userId !== idUser && req.user.role !== 'admin') {
            return res.status(403).json({ status:'error', message: 'you do not have permission to delete this book.' });
        }
        // Eliminar el libro
        await bookExist.destroy();

        return res.status(200).json({ status:'success', message: 'successfully deleted book' });
        
    } catch (error) {
        return res.status(500).json({status:'error', message:'internal server error', err:error});
    }
}

/* Solo el usuario que lo creo puede cambiar el estado de lectura*/
export const changeBookStatus = async (req,res) =>{
    const bookId = req.params.id;
    const userId = req.user.id;
    const { status } = req.body;

    const allowedStatuses = ['unread', 'reading', 'read'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({status:'error', message:'invalid status'});
    }

    try {
        const book = await Book.findOne({ where: { id: bookId, userId } });
        if (!book) {
            return res.status(404).json({status:'error', message:'book not found'});
        }

        book.status = status;
        await book.save();

        return res.json({ status:'success',message: 'book updated', book });
    } catch (error) {
        return res.status(500).json({status:'error', message:'internal server error'});
    }
}

/* Solo el usuario que lo creo puede cambiar el puntaje*/
export const changeBookRating= async (req,res) =>{
    const bookId = req.params.id;
    const userId = req.user.id;

     // Verificar si rating viene en el body
    if (!req.body || typeof req.body.rating === 'undefined') {
        return res.status(400).json({ status: 'error', message: 'rating is required' });
    }

    const rating = parseInt(req.body.rating, 10);

    // Validar que rating sea un número entre 0 y 10
    if (isNaN(rating) || rating < 0 || rating > 10) {
        return res.status(400).json({ status: 'error', message: 'invalid rating' });
    }

    try {
        const book = await Book.findOne({ where: { id: bookId, userId } });
        if (!book) {
            return res.status(404).json({ status: 'error', message: 'book not found' });
        }

        book.rating = rating;
        await book.save();

        return res.json({ status: 'success', message: 'rating updated', book });
    } catch (error) {
        return res.status(500).json({status:'error', message:'internal server error'});
    }
}

/* Obteneer todos los libros de un usuario */
export const getAllBooksFromUser = async (req, res) => {
    const userId = req.user.id;

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

/* Obtener libros por status */
export const filterBooksByStatus = async (req, res) => {
  const { status } = req.query;

  const validStatuses = ['unread', 'reading', 'read'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ status: 'error', message: 'Invalid status' });
  }

  try {
    const books = await Book.findAll({
      where: {
        status,
        userId: req.user.id
      }
    });

    return res.json({ status: 'success', books });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
}

/* Obtener los libros del usuario por categoria */
export const filterBooksByCategory = async (req, res) => {
  const { category } = req.query;

  
  if (!validCategories.includes(category)) {
    return res.status(400).json({ status: 'error', message: 'Invalid category' });
  }

  try {
    const books = await Book.findAll({where: {category,userId: req.user.id}});

    return res.json({ status: 'success', books });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
};

/* Obtener libros por su titulo like */
export const searchBooksByTitle = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ status: 'error', message: 'Title is required' });
  }

  try {
    const books = await Book.findAll({
      where: {
        bookname: {
          [Op.like]: `%${title}%` 
        },
        userId: req.user.id 
      }
    });

    return res.json({ status: 'success', books });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
};

/* Obtener estadiscitas del perfil del usuario */
export const getBookStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Contar libros por estado
    const totalBooks = await Book.count({ where: { userId } });
    const read = await Book.count({ where: { userId, status: 'read' } });
    const reading = await Book.count({ where: { userId, status: 'reading' } });
    const unread = await Book.count({ where: { userId, status: 'unread' } });

    // Calcular promedio de rating (solo para libros con rating > 0)
    const ratingResult = await Book.findOne({
      where: { userId },
      attributes: [[fn('AVG', col('rating')), 'averageRating']]
    });

    const averageRating = parseFloat(ratingResult?.dataValues.averageRating || 0).toFixed(1);

    return res.json({
      status: 'success',
      totalBooks,
      read,
      reading,
      unread,
      averageRating: Number(averageRating)
    });

  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
};