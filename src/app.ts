import express, { Application } from 'express'; // Import Express and Application types
import { errorHandler } from './middleware/error-middleware';
import authRoutes from './modules/auth/routes';  // Import auth routes from the routes module
import userRoutes from './modules/users/routes'; // Import user routes from the routes module

const app: Application = express(); // Create an Express application instance

app.use(express.json()); // Middleware to parse JSON request bodies

// Register auth-related routes under the '/auth' path
app.use('/api/auth', authRoutes);

// Register user-related routes under the '/users' path
app.use('/api/users', userRoutes);

// Centralized error handling middleware
app.use(errorHandler);

export default app; // Export the application instance for use in other modules
