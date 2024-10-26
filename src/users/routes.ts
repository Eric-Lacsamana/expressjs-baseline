import { Router } from 'express';
import { getUsers, createUser } from './controllers';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.post('/', createUser);

export default userRoutes;