export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        // this.isOperational = true; // Indicates that the error was expected
        Error.captureStackTrace(this, this.constructor);
    }
}