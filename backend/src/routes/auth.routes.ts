import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../middleware/validator';

const router = Router();

// POST /api/auth/register
router.post('/register', validateRegister, AuthController.register);

// POST /api/auth/login
router.post('/login', validateLogin, AuthController.login);

export default router;