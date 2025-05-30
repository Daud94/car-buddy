import {UserModel} from "./users.schema";
import {IUser} from "./IUser";
export class UsersService {
    async createUser(userData:any): Promise<IUser> {
        const user = new UserModel(userData);
        return await user.save();
    }

    async getUserById(userId: string): Promise<IUser|null> {
        return await UserModel.findById(userId).exec();
    }

    async getUserByEmail(email:string): Promise<IUser|null> {
        return await UserModel.findOne({ email }).exec();
    }

    async getAllUsers(): Promise<IUser[]> {
        return await UserModel.find().exec();
    }

    async updateUser(userId: string, userData: any): Promise<any> {
        return await UserModel.findByIdAndUpdate(userId, userData, { new: true }).exec();
    }

    async deleteUser(userId: string): Promise<any> {
        return await UserModel.findByIdAndDelete(userId).exec();
    }
}