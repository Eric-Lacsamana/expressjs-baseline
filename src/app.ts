import express, { Application } from 'express';
import { errorHandler } from './middleware/error-middleware';
import authRoutes from './modules/auth/routes';
import userRoutes from './modules/users/routes';

const app: Application = express(); // Create an Express application instance

app.use(express.json()); // Middleware to parse JSON request bodies

// Register auth-related routes under '/api/auth'
app.use('/api/auth', authRoutes);

// Register user-related routes under '/api/users'
app.use('/api/users', userRoutes);

// Centralized error handling middleware
app.use(errorHandler);

export default app; // Export the application instance for use in other modules
