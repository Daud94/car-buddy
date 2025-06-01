import {UsersService} from "../users/users.service";
import {AppError} from "../utils/app-error";
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {ConfigService} from "../config/config.service";

export class AuthService {
    private usersService: UsersService;
    private configService: ConfigService;

    constructor() {
        this.usersService = new UsersService();
        this.configService = new ConfigService();
    }

    async login(data: { email: string, password: string }) {
        const existingUser = await this.usersService.getUserByEmail(data.email);
        if (!existingUser) {
            throw AppError.notFound('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(data.password, existingUser.password);
        if (!isMatch) {
            throw AppError.badRequest('Invalid credentials');
        }

        const jwtSecret: string = this.configService.get('JWT_SECRET');
        const jwtExpiration = this.configService.get('JWT_EXPIRATION');


        const payload = {userId: existingUser._id, role: existingUser.role};
        const token = jwt.sign(payload, jwtSecret, {expiresIn: jwtExpiration});
        return {
            token,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                role: existingUser.role
            }
        }
    }

    async register(userData: { firstName: string, lastName: string, email: string, password: string }) {
        const existingUser = await this.usersService.getUserByEmail(userData.email);
        if (existingUser) {
            throw AppError.conflict('Email already exists');
        }
        const saltRounds = +this.configService.get('SALT_ROUNDS');
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        const newUser = {
            ...userData,
            password: hashedPassword
        };
        await this.usersService.createUser(newUser);

    }
}
