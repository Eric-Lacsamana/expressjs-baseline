import { NextFunction, Request, Response } from "express";
import userService from "./service";
import { NotFoundError } from "../../errors/NotFoundError";

// Controller to handle fetching all users
const userController = {
    getUsers:async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Fetch all users from the user service
            const users = await userService.findAllUsers();
            
            // Respond with a 200 status and the user data
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            next(error);
        }
    },
    // Controller to handle fetching a specific user by ID
    getUser: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params; // Extract user ID from request parameters
        try {
            // Fetch user by ID from the user service
            const existingUser = await userService.findUserById(id);

            if (!existingUser) {
                throw new NotFoundError('User not found')
            }
    
            // Respond with a 200 status and the user data
            res.status(200).json({ success: true, data: existingUser });
        } catch (error) {
            next(error);
        }
    },
}

export default userController;