import {model, Schema} from "mongoose";
import {IUser} from "./IUser";

const schemaDefinition = {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, enum: ['user', 'dealer']},
} as const;
const usersSchema = new Schema<IUser>(schemaDefinition,{timestamps:true});

export const UserModel = model('User', usersSchema, 'users'); // 'users' is the collection name in MongoDB