import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername, userExists } from '../userRepository';
import { generateToken } from './services';

const saltRounds = 10;

export const register = async (req: Request, res: Response) => {
    try{
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            res.status(400).json({ message: 'Username and password are required' });
            return;
        }

        // Check if user exists
        if (userExists(username)) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const payload = { username, password: hashedPassword };
     
        // mimic orm using dummy repository replace with real one
        const newUser = await createUser(payload);

        const token = generateToken(newUser);
    
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
            jwt: token,
          });
    } catch (err) {
        throw new Error('Error registration')
    }
    
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    // Find user by username
    const user = await findUserByUsername(username);

    // Check if user exists
    if (!user) {
        res.status(404).send({ message: 'Username or Password is incorrect' });
        return;
    }

    // Compare provided password with hashed password
    const match = await bcrypt.compare(password, user.password); // Use await here

    // If password does not match
    if (!match) {
        res.status(401).send({ message: 'Username or Password is incorrect' });
        return;
    }

    // Generate JWT token
    const token = await generateToken(user);

    // Send response
    res.status(200).json({
        user: { id: user.id, username: user.username },
        jwt: token
    });
}