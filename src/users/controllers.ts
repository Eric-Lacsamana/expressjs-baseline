import { Request, Response } from "express";
import { findUserById, findAllUsers } from "../userRepository";
// import user model or entity


export const getUsers = async (req: Request, res: Response) => {
    const users = await findAllUsers();

    res.status(200).json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
   
    const userEntry = await findUserById(id);

    res.status(200).json(userEntry);
}