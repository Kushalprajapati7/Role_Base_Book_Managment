import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/userModel';
import  { UserDocument } from '../interfaces/userInterface'
import RoleModel, { RoleDocument } from '../models/roleModel';
import CustomRequest from '../types/customRequest';

export const rbacMiddleware = (permission: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as CustomRequest).userId;
            // console.log(userId);
            
            const user = await UserModel.findById( userId );

            // const user = req.user as UserDocument;
            // console.log(user);

            const userRole = await RoleModel.findOne({ name: user?.role }) as RoleDocument;
            // console.log(userRole.permissions);
            
            // if (userRole && permission.every((permission: string) => userRole.permissions.includes(permission))) {
                if(userRole && userRole.permissions.includes(permission)){
                next();
            } else {
                res.status(403).json({ message: `You do not have permission to ${permission} this resource.` });
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
};
