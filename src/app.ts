import  express, { Application, Request, Response } from 'express';
import userRoutes from './users/routes';


const app: Application = express();

app.use(express.json());
app.use('/users', userRoutes);
// app.use(errorHandler);


export default app;