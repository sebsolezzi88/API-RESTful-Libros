/* req.user ={
            id: userExits.id,
            username: userExits.username,
            role: userExits.role
        }  */

export const addBook = async (req,res) =>{
   const  {bookname, author} = req.body;
    console.log(bookname);
    return res.send({message:'listo'});
}