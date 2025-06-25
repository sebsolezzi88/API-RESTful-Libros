import { Router } from 'express';
import { addBook, changeBookRating, changeBookStatus, 
         changeNameAuthorCategoryBook, deleteBook, filterBooksByCategory, filterBooksByStatus, 
        getAllBooksFromUser, getBookStats, searchBooksByTitle } from '../controllers/bookController.js';
import { verifyToken } from '../middlewares/authMiddlewares.js';


const router = Router();

router.get('/getbooks',verifyToken,getAllBooksFromUser);
router.get('/filterbooks',verifyToken,filterBooksByStatus); /* /books/filterbook?status=read */
router.get('filtercategory',verifyToken,filterBooksByCategory) /* /books/filterbook?category=fiction */
router.get('/searchbooks',verifyToken,searchBooksByTitle);/* /books/searchbooks?title=javascript */
router.get('/stats', verifyToken, getBookStats);
router.post('/addbook',verifyToken ,addBook);
router.delete('/deletebook/:id',verifyToken,deleteBook);
router.put('/updatebook/:id',verifyToken,changeNameAuthorCategoryBook);
router.put('/changebooktatus/:id',verifyToken,changeBookStatus);
router.put('/changebookrating/:id',verifyToken,changeBookRating);


export default router;