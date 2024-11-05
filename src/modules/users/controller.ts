import { NextFunction, Request, Response } from "express";
import userService from "./service";
import { NotFoundError } from "../../errors/NotFoundError";

// Controller for user-related operations
const userController = {
    createUser: async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, username, password } = req.body;
        try {
            const user = await userService.createUser({ name, email, username, password });
            res.status(201).json({ data: user });
        } catch (error) {
            next(error);
        }
    },

    getUsers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userService.findAllUsers();
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            next(error);
        }
    },

    getUser: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const existingUser = await userService.findUserById(id);
            if (!existingUser) {
                throw new NotFoundError('User not found');
            }
            res.status(200).json({ success: true, data: existingUser });
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { name, email, username, password } = req.body;
        try {
            const existingUser = await userService.findUserById(id);
            if (!existingUser) {
                throw new NotFoundError('User not found');
            }

            const updatedUserData = await userService.updateUserById(id, { name, email, username, password });
            res.status(200).json({ success: true, data: updatedUserData });
        } catch (error) {
            next(error);
        }
    },

    deleteUser: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const existingUser = await userService.findUserById(id);
            if (!existingUser) {
                throw new NotFoundError('User not found');
            }

            await userService.deleteUserById(id);
            res.status(204).json({ success: true });
        } catch (error) {
            next(error);
        }
    },
}

export default userController;
