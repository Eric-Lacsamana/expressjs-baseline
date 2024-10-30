import express, { Application } from 'express'; // Import Express and Application types
import { errorHandler } from './middleware/error-middleware';
import userRoutes from './users/routes'; // Import user routes from the routes module
import authRoutes from './auth/routes';


const app: Application = express(); // Create an Express application instance

app.use(express.json()); // Middleware to parse JSON request bodies

// Register auth-related routes under the '/auth' path
app.use('/auth', authRoutes);

// Register user-related routes under the '/users' path
app.use('/users', userRoutes);


// Centralized error handling middleware
app.use(errorHandler);

export default app; // Export the application instance for use in other modules
