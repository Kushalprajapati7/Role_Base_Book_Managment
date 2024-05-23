import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config();

export class JwtUtills {
    static key:string = process.env.secretKey || "KP";

    static generateToken(userId:string,role:string):string{
        const token = jwt.sign({userId, role},this.key,{expiresIn:'1h'})
        return token;
    }

    static verifyToken(token:string):string|object{
        try {
            const decode = jwt.verify(token,this.key)
            // console.log(decode);
            
            return decode
        } catch (error:any) {
            throw new Error('Invalid token');
        }
    }
}

// export default new JwtUtills()