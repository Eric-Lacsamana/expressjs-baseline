import { Request, Response } from "express";
// import user model or entity


export const getUsers = async (req: Request, res: Response) => {

    res.send([]);
};

export const getUser = async (req: Request, res: Response) => {
    const { id }  = req.query;
   

    res.send({});
}