import jwt from 'jsonwebtoken';
import { GetUserResponse } from '../../types';

const authService = {
    generateToken: ({ id, username }: GetUserResponse) => {
        return jwt.sign({ id, username }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN });
    },
}

export default authService;