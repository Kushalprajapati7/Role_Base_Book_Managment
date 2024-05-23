import mongoose,{Schema, Document} from "mongoose";

export interface CategoryDocument{
    _id? : mongoose.Schema.Types.ObjectId;
    name:string;
    description : string;
}
