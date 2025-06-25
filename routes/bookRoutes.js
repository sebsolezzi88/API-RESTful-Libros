import { Router } from 'express';
import { addBook, changeBookStatus, changeNameAuthorBook, deleteBook } from '../controllers/bookController.js';
import { verifyToken } from '../middlewares/authMiddlewares.js';


const router = Router();

router.post('/addbook',verifyToken ,addBook);
router.post('/deletebook/:id',verifyToken,deleteBook);
router.post('/updatebook/:id',verifyToken,changeNameAuthorBook);
router.put('/changebookstatus/:id',verifyToken,changeBookStatus);


export default router;