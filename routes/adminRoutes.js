import { Router } from 'express';

import { verifyToken } from '../middlewares/authMiddlewares.js';
import { deleteAnyUser, getAllBooks } from '../controllers/adminController.js';


const router = Router();

router.get('/getallbooks',verifyToken,getAllBooks);
router.delete('/addbook',verifyToken ,deleteAnyUser);



export default router;