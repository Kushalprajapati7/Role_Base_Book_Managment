import mongoose from "mongoose";

export interface AuthorDocument {
    _id? : mongoose.Schema.Types.ObjectId;
    name: string;
    biography: string;
    nationality: string;
}