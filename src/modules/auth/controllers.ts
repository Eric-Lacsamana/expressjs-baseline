import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import authService from './services';
import userService from '../users/service';
import userRepository from '../../userRepository';
import { BadRequestError } from '../../errors/BadRequestError';
import { UnauthorizedError } from '../../errors/UnauthorizedError';
import { NotFoundError } from '../../errors/NotFoundError';
import { ConflictError } from '../../errors/ConflictError';


const authController = {
    // handler for user registration
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;
    
            // Validation: Check for required fields
            if (!username || !password) {
                throw new BadRequestError('Username and password are required');
            }
    
            // Check if the username already exists
            const existingUser = await userService.findUserByUsername(username);

            if (existingUser) {
                throw new ConflictError('Username already in used');
            }
    
            // Create the new user using the user service
            const newUser = await userService.createUser({ username, password });
    
            // Generate JWT token for the new user
            const token = authService.generateToken(newUser);
        
            // Send success response
            res.status(201).json({
                message: 'User registered successfully',
                user: newUser,
                jwt: token,
            });
    
        } catch (err) {
           next(err);
        }
    },
    // Handler for user login
     login: async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body;
        try {
            // Find user by username
            const [user] = await userRepository.find({ where: { username } });
    
            // Check if the user exists
            if (!user) {
                throw new NotFoundError('Username or password is incorrect');
            }
    
            // Compare provided password with the hashed password
            const match = await bcrypt.compare(password, user.password);
    
            // If the password does not match
            if (!match) {
                throw new UnauthorizedError('Username or password is incorrect');
            }

            // Generate JWT token for the authenticated user
            const token = authService.generateToken(user);
    
            // Send success response with user details and token
            res.status(200).json({
                user: { id: user.id, username: user.username },
                jwt: token,
            });
            
        } catch (err) {
           next(err);
        }
    }
}
export default authController;