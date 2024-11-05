import { AppError } from './AppError';

export class ConflictError extends AppError {
    constructor(message: string = 'Conflict during operation') {
        super(message, 409);
    }
}
