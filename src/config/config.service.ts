import dotenv from 'dotenv';
import { environmentSchema } from './enviroment.validate';
import { AppError } from '../utils/app-error';
import path from "node:path";


const envConfig = dotenv.config({ path: path.join(process.cwd(), '.env') });

export class ConfigService {
    private config: { [key: string]: any } = {};

    constructor() {
        this.loadConfig();
    }

    private loadConfig(): void {
        const { error, value } = environmentSchema.validate(envConfig.parsed);
        if (error) {
            throw AppError.badRequest(`Invalid configuration: ${error.message}`);
        }
        this.config = value;
    }

    get(key: string): any {
        return this.config[key];
    }
}
