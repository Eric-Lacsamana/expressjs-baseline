import { Request, Response } from "express";
import userService from "./service";

// Controller to handle fetching all users
const userController = {
    getUsers:async (req: Request, res: Response) => {
        try {
            // Fetch all users from the user service
            const users = await userService.findAllUsers();
            
            // Respond with a 200 status and the user data
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            // Log the error for debugging
            console.error(error);
            
            // Respond with a 500 status in case of a server error
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    // Controller to handle fetching a specific user by ID
    getUser: async (req: Request, res: Response) => {
        const { id } = req.params; // Extract user ID from request parameters
    
        try {
            // Fetch user by ID from the user service
            const userEntry = await userService.findUserById(id);
    
            // Check if the user was found; if not, respond with a 404 status
            if (!userEntry) {
                res.status(404).json({ success: false, message: "User not found" });
                return;
            }
    
            // Respond with a 200 status and the user data
            res.status(200).json({ success: true, data: userEntry });
        } catch (error) {
            // Log the error for debugging
            console.error(error);
            
            // Respond with a 500 status in case of a server error
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
}

export default userController;