import { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/UnauthorizedError';

interface CustomRequest extends Request {
    token?: JwtPayload;
}

export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return next(new UnauthorizedError('Unauthorized: No token provided'));
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            if (err instanceof TokenExpiredError) {
                return next(new UnauthorizedError('Unauthorized: Token has expired'));
            } else if (err instanceof JsonWebTokenError) {
                return next(new UnauthorizedError('Unauthorized: Invalid or malformed token'));
            } else {
                return next(err);
            }
        }

        req.token = decoded as JwtPayload;
        next();
    });
};
