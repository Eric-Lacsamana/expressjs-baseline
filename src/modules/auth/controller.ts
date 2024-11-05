import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import authService from './service';
import userService from '../users/service';
import userRepository from '../../userRepository';
import { BadRequestError } from '../../errors/BadRequestError';
import { UnauthorizedError } from '../../errors/UnauthorizedError';
import { NotFoundError } from '../../errors/NotFoundError';
import { ConflictError } from '../../errors/ConflictError';

const authController = {
    // User registration handler
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, username, password } = req.body;

            // Validate required fields
            if (!username || !password) {
                throw new BadRequestError('Username and password are required');
            }
    
            // Check if username already exists
            const existingUser = await userService.findUserByUsername(username);

            if (existingUser) {
                throw new ConflictError('Username already in use');
            }
    
            // Create the new user
            const newUser = await userService.createUser({ name, email, username, password });
    
            // Generate JWT token
            const token = authService.generateToken(newUser);
        
            // Respond with user details and JWT
            res.status(201).json({
                message: 'User registered successfully',
                user: newUser,
                jwt: token,
            });
    
        } catch (err) {
           next(err);
        }
    },
    // User login handler
    login: async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body;
        try {
            // Find user by username
            const [user] = await userRepository.find({ where: { username } });
    
            // If user not found, return error
            if (!user) {
                throw new NotFoundError('Username or password is incorrect');
            }
    
            // Compare passwords
            const match = await bcrypt.compare(password, user.password);
    
            if (!match) {
                throw new UnauthorizedError('Username or password is incorrect');
            }

            // Generate JWT token for authenticated user
            const token = authService.generateToken(user);
    
            // Respond with user details and token
            res.status(200).json({
                user: { id: user.id, username: user.username },
                jwt: token,
            });
            
        } catch (err) {
           next(err);
        }
    }
};

export default authController;
