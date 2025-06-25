import { Router } from 'express';
import { addBook, changeBookRating, changeBookStatus, changeNameAuthorBook, deleteBook, getAllBooksFromUser } from '../controllers/bookController.js';
import { verifyToken } from '../middlewares/authMiddlewares.js';


const router = Router();

router.get('/getbooks',verifyToken,getAllBooksFromUser);
router.post('/addbook',verifyToken ,addBook);
router.post('/deletebook/:id',verifyToken,deleteBook);
router.post('/updatebook/:id',verifyToken,changeNameAuthorBook);
router.put('/changebooktatus/:id',verifyToken,changeBookStatus);
router.put('/changebookrating/:id',verifyToken,changeBookRating);


export default router;