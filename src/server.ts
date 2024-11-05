import dotenv from 'dotenv'; // For environment variable management
import http from 'http'; // For managing the HTTP server
import app from './app'; // Import the Express app

// Load environment variables from .env file
dotenv.config();

// Get the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Create an HTTP server using the app instance
const server = http.createServer(app);

// Graceful shutdown logic
const shutdown = (signal: string) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);

    // Stop the server from accepting new connections
    server.close((err) => {
        if (err) {
            console.error('Error during server shutdown:', err);
            process.exit(1); // Exit with an error code if there's an issue
        }

        console.log('Server has been shut down gracefully.');
        process.exit(0); // Exit cleanly
    });

    // Optionally close other resources (e.g., DB, cache)
};

// Listen for termination signals (e.g., SIGINT, SIGTERM)
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Start the server and listen for requests
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the server for testing purposes (so we can close it in tests)
export { server };
