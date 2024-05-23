import roleServices from "../services/roleServices";
import { Request, Response } from "express";

class RoleConroller{
    public async createRole(req:Request, res:Response):Promise<void>{
        try {
                const {name, permissions} =req.body;
                const newRole = await roleServices.addRole(name,permissions);
                res.json(newRole)
        } catch (error:any) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export default new RoleConroller();