import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    // Set the default status code to 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;

    // Respond with the error message
    res.status(statusCode).json({
        // success: false,
        statusCode,
        message: err.message || "Internal Server Error",
    });
};
