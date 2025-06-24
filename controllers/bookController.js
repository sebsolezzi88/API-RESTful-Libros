import Book from "../Models/Book.js";


/* req.user ={
            id: userExits.id,
            username: userExits.username,
            role: userExits.role
        }  */

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