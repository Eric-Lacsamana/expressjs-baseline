import jwt from 'jsonwebtoken';
import { RetrieveUser } from '../types';


export const generateToken = ({ id, username }: RetrieveUser) => {
    return jwt.sign({ id, username }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};
