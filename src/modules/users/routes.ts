import { Router } from 'express';
import { authenticateJWT } from '../../middleware/auth-middleware'; // Importing JWT authentication middleware
import userController from './controllers'; // Importing controller functions for user operations

// Create a new router instance for user-related routes
const userRoutes = Router();

// Route to get all users - protected by JWT authentication
userRoutes.get('/', authenticateJWT, userController.getUsers);

// Route to get a specific user by ID - protected by JWT authentication
userRoutes.get('/:id', authenticateJWT, userController.getUser);

// Export the user routes to be used in the main application
export default userRoutes;
