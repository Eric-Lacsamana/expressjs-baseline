import app from './app';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT;

// write your app initialization here
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});