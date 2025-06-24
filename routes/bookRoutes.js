import { Router } from 'express';
import { addBook } from '../controllers/bookController.js';
import { verifyToken } from '../middlewares/authMiddlewares.js';


const router = Router();

router.post('/addBook',verifyToken ,addBook);


export default router;