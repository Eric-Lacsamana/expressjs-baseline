import { Request, Response } from "express";
import { findUserById, findAllUsers } from "../userRepository";

// Controller to handle fetching all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        // Fetch all users from the repository
        const users = await findAllUsers();
        
        // Respond with a 200 status and the user data
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        // Log the error for debugging
        console.error(error);
        
        // Respond with a 500 status in case of server error
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Controller to handle fetching a specific user by ID
export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params; // Extract user ID from request parameters

    try {
        // Fetch user by ID from the repository
        const userEntry = await findUserById(id);

        // Check if user was found; if not, respond with 404 status
        if (!userEntry) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Respond with a 200 status and the user data
        res.status(200).json({ success: true, data: userEntry });
    } catch (error) {
        // Log the error for debugging
        console.error(error);
        
        // Respond with a 500 status in case of server error
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
