import { Router } from 'express';
import { getUsers, getUser } from './controllers';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUser);

export default userRoutes;