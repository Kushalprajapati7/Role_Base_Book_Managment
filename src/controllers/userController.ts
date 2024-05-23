import { Request, Response } from "express";
import userServices from "../services/userServices";

class UserController {
    public async creatUser(req: Request, res: Response): Promise<void> {
        try {
                const {username, password, email,role} = req.body;
                const newUser = await userServices.createUser(username, email,password,role);
                res.json(newUser);
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async loginUser(req:Request, res:Response):Promise<void>{
        try {
            const {username, password} = req.body;
            const user = await userServices.loginUser(username,password);
            res.json({user, message:"User Login Successfully"})
        } catch (error:any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async getAllUser(req:Request, res:Response):Promise<void>{
        try {
            const allUser = await userServices.allUser();
            res.json(allUser)
        } catch (error:any) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export default new UserController();