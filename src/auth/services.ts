import jwt from 'jsonwebtoken';
import { GetUserResponse } from '../types';


export const generateToken = ({ id, username }: GetUserResponse) => {
    return jwt.sign({ id, username }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};
