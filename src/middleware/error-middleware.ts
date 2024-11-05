import { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (err: any, req: Request, res: Response) => {
    // Set the default status code to 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;

    // Respond with the error message
    res.status(statusCode).json({
        // success: false,
        statusCode,
        message: err.message || 'Internal Server Error',
    });
};
