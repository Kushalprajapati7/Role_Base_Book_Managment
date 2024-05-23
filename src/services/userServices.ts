import UserModel from "../models/userModel";
import  { UserDocument } from '../interfaces/userInterface'
import bcrypt from 'bcrypt'
import {JwtUtills} from "../utils/jwtutils";
class UserServices{
    public async createUser(username:string, email:string, password:string, role:string):Promise<UserDocument>{
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new UserModel({username,email,password:hashPassword, role});

        return await newUser.save();
    }

    public async loginUser(username:string, password:string):Promise<string>{
        const user = await UserModel.findOne({username});
        console.log("role",user?.role);
        
        if(!user){
            throw new Error(`User with Username ${username} not found`); 
        }

        const pass = await bcrypt.compare(password,user.password);
        if(!pass){
            throw new Error(`Incorrect password`); 
        }

        const token = JwtUtills.generateToken(user.id, user.role);

        return token;
    }

    public async allUser():Promise<UserDocument[]>{
        const user = await UserModel.find()
        return user;
    }
}

export default new UserServices();