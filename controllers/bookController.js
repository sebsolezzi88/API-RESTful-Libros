import Book from "../Models/Book.js";


/* req.user ={
            id: userExits.id,
            username: userExits.username,
            role: userExits.role
        }  */

/* Solo los usuarios registrados y admins puede crear libros*/
export const addBook = async (req,res) =>{
    const  {bookname, author} = req.body;
    const {id} = req.user;
    console.log(`el id del usuario es ${id}`)
   
    if(bookname.trim() === '' || author.trim() === ''){
          return res.status(400).json({status:'error', message:'bookname or author required'});
    }
    try {
        // Verificar si el mismo libro ya fue guardado por el mismo usuario
        const existingBook = await Book.findOne({where: {bookname,userId: id}});

        if (existingBook) {
        return res.status(409).json({status: 'error', message: 'you already saved this book.'});
        }
        //Guardamos el libro en la base de datos
        await Book.create({bookname,author,userId:id})
        return res.status(201).json({status:'success', message:'book add successfully'});
    } catch (error) {
        return res.status(500).json({status:'error', message:'internal server error', err:error});
    }
    
}

/* Solo el usuario que lo creo y el admin pueden cambiar nombre y autor*/
export const changeNameAuthorBook = async (req,res) =>{}

/* Solo el usuario que lo creo y el admin pueden borrarlos*/
export const deleteBook = async (req,res) =>{}

/* Solo el usuario que lo creo puede cambiar el estado de lectura*/
export const changeBookStatus = async (req,res) =>{}

/* Solo el usuario que lo creo puede cambiar el puntaje*/
export const changeBookRating= async (req,res) =>{}