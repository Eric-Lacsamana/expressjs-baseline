import { Request, Response } from "express";
import { User } from '../models/User';
import { AppDataSource } from "../database";

export const getUsers = async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    res.send(users);
}

export const createUser = async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User);
    const { username, password }  = req.body;
   
    const user = await userRepository.create({
        username,
        password,
    })
    
    res.send(user);
}