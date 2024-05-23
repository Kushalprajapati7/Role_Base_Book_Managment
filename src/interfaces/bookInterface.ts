import mongoose, { Schema } from 'mongoose';

export interface BookDocument {
    _id?: mongoose.Schema.Types.ObjectId;
    title: string;
    author: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId;
    ISBN : string;
    description : string;
    price : number;
}