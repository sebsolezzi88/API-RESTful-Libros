import { Router } from 'express';

import { verifyToken } from '../middlewares/authMiddlewares.js';
import { deleteAnyUser, getAllBooks } from '../controllers/adminController.js';
import { isAdmin } from '../middlewares/adminMiddelwares.js';


const router = Router();

router.get('/getallbooks',verifyToken,isAdmin,getAllBooks);
router.delete('/delete-user/:id',verifyToken ,isAdmin,deleteAnyUser);



export default router;