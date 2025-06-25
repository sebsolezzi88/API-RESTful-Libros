import { Router } from 'express';
import { deleteUserAccount, loginUser, registerUser } from '../controllers/authController.js'
import { verifyToken } from '../middlewares/authMiddlewares.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login',loginUser);
router.delete('/delete-account', verifyToken, deleteUserAccount);

export default router;