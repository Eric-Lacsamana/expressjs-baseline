import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import authService from './services';
import userService from '../users/service';
import userRepository from '../../userRepository';


const authController = {
    // handler for user registration
    register: async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
    
            // Validation: Check for required fields
            if (!username || !password) {
                res.status(400).json({ message: 'Username and password are required' });
                return;
            }
    
            // Check if the username already exists
            const existingUser = await userService.findUserByUsername(username);
        
            if (existingUser) {
                res.status(400).json({ message: 'Username already exists' });
                return;
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
            console.error(err); // Log the error for debugging
            res.status(500).json({ message: 'Error during registration' });
        }
    },
    // Handler for user login
     login: async (req: Request, res: Response) => {
        const { username, password } = req.body;
        try {
            // Find user by username
            const [user] = await userRepository.find({ where: { username } });
    
            // Check if the user exists
            if (!user) {
                res.status(404).json({ message: 'Username or password is incorrect' });
                return;
            }
    
            // Compare provided password with the hashed password
            const match = await bcrypt.compare(password, user.password);
    
            // If the password does not match
            if (!match) {
                res.status(401).json({ message: 'Username or password is incorrect' });
                return;
            }

            // Generate JWT token for the authenticated user
            const token = authService.generateToken(user);
    
            // Send success response with user details and token
            res.status(200).json({
                user: { id: user.id, username: user.username },
                jwt: token,
            });
            
        } catch (err) {
            console.error(err); // Log the error for debugging
            res.status(500).json({ message: 'Error during login' });
        }
    }
}
export default authController;