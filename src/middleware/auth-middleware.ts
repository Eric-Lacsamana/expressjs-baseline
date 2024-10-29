import jwt, { Secret, JwtPayload, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';



// Extend Express Request to include an optional token property for decoded payload
export interface CustomRequest extends Request {
  token?: string | JwtPayload;
}

export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction): void => {
  try {
    // Extract the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('token', token);
    if (!token) {
      // Respond with 401 if no token is provided
      res.status(401).send({ message: 'Unauthorized: No token provided' });
      return;
    }

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload; // Cast to JwtPayload for type safety
    console.log('decoded', decoded);
    req.token = decoded; // Store decoded payload in request

    next(); // Proceed to the next middleware
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      // Respond with 401 if the token has expired
      res.status(401).send({ message: 'Unauthorized: Token has expired' });
      return;
    }
    
    if (err instanceof JsonWebTokenError) {
      // Respond with 401 for other JWT errors (invalid signature, etc.)
      res.status(401).send({ message: `Unauthorized: ${err.message}` });
      return;
    }
    
    // Log general errors for debugging and respond with 500
    console.error('Authentication error:', err);
    res.status(500).send({ message: 'Internal server error' });
  }
};
