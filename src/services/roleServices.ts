import RoleModel,{RoleDocument} from "../models/roleModel";

class RoleServices{
    public async addRole(name:string, permissions:string[]):Promise<RoleDocument>{
        const newRole = new RoleModel({name, permissions});
        return await newRole.save(); 
    }
}

export default new RoleServices();