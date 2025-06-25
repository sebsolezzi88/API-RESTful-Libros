import { Router } from 'express';
import { addBook, deleteBook } from '../controllers/bookController.js';
import { verifyToken } from '../middlewares/authMiddlewares.js';


const router = Router();

router.post('/addbook',verifyToken ,addBook);
router.post('/deletebook/:id',verifyToken,deleteBook)


export default router;