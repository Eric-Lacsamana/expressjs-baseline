import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { createUser, findUserByUsername, userExists } from '../userRepository';
import { generateToken } from './services';

const saltRounds = 10;

// Handler for user registration
export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Validation: Check for required fields
        if (!username || !password) {
            res.status(400).json({ message: 'Username and password are required' });
            return;
        }

        // Check if username already exists
        if (await userExists(username)) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user payload
        const payload = { username, password: hashedPassword };

        // Create the user in the database (dummy repository simulation)
        const newUser = await createUser(payload);

        // Generate JWT token for the new user
        const token = generateToken(newUser);
    
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
}

// Handler for user login
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await findUserByUsername(username);

        // Check if user exists
        if (!user) {
            res.status(404).json({ message: 'Username or Password is incorrect' });
            return;
        }

        // Compare provided password with the hashed password
        const match = await bcrypt.compare(password, user.password);

        // If password does not match
        if (!match) {
            res.status(401).json({ message: 'Username or Password is incorrect' });
            return;
        }

        // Generate JWT token for the authenticated user
        const token = await generateToken(user);

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
