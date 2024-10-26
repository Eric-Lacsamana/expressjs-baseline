import { Request, Response, NextFunction } from 'express';
import bcyrpt from 'bcryptjs';


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { username, password } = req.body;

        const hashedPassword = await bcyrpt.hash(password, 10);

        // write your create user orm here

        res.send({
            // register user response
        })
    } catch (err) {
        throw new Error('Error registration')
    }
    
}

export const login = async () => {

}