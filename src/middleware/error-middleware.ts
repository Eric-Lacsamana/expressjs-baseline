import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err); // Log the error for debugging

    // Set the default status code to 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;
    
    // Respond with the error message
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
