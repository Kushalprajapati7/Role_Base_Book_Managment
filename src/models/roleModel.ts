import mongoose, { Schema, Document } from 'mongoose';

export interface RoleDocument extends Document {
    name: string;
    permissions: string[]; 
}

const RoleSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String }]
});

const RoleModel = mongoose.model<RoleDocument>('Role', RoleSchema);

export default RoleModel;
