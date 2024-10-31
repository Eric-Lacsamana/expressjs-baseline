import jwt, { JwtPayload, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/UnauthorizedError';


// Extend the Request interface to include a token property
interface CustomRequest extends Request {
  token?: JwtPayload; // Optional property to hold the decoded JWT payload
}

// Middleware function to authenticate JWT
export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction): void => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if the token is not provided
  if (!token) {
    // Respond with 401 Unauthorized if no token is found
    return next(new UnauthorizedError('Unauthorized: No token provided'));
  }

  // Verify the token using the secret from environment variables
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    // Check for verification errors
    if (err) {
      // Handle specific JWT errors
      if (err instanceof TokenExpiredError) {
        // Token has expired
        return next(new UnauthorizedError('Unauthorized: Token has expired'));
      } else if (err instanceof JsonWebTokenError) {
        // Token is invalid (malformed or incorrect)
        return next(new UnauthorizedError('Unauthorized: Invalid or malformed token'));
      } else {
        // For any other errors, pass it to the next error handler
        return next(err);
      }
    }

    // If the token is valid, store the decoded payload in the request
    req.token = decoded as JwtPayload; // Cast to JwtPayload for type safety

    // Call next middleware in the stack
    next();
  });
};
