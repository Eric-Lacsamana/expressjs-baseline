import { Router } from 'express';
import { getUsers, getUser } from './controllers'; // Importing controller functions for user operations
import { authenticateJWT } from '../middleware/auth-middleware'; // Importing JWT authentication middleware

// Create a new router instance for user-related routes
const userRoutes = Router();

// Route to get all users - protected by JWT authentication
userRoutes.get('/', authenticateJWT, getUsers);

// Route to get a specific user by ID - protected by JWT authentication
userRoutes.get('/:id', authenticateJWT, getUser);

// Export the user routes to be used in the main application
export default userRoutes;
