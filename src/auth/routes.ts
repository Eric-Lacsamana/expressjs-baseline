import { Router } from 'express';
import { register, login } from './controllers';

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/auth', login);

export default authRoutes;