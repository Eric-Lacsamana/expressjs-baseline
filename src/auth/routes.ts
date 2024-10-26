import { Router } from 'express';
import { register } from './controllers';

const authRoutes = Router();

authRoutes.get('/register', register);
// authRoutes.post('/auth', login);

export default authRoutes;