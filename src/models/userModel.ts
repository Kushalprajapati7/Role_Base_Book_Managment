import mongoose, { Schema, Document } from 'mongoose';
import { UserDocument } from '../interfaces/userInterface';

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user', 'author'], default: 'user' }
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
