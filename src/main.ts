import app from './app';
import {ConfigService} from "./config/config.service";
import {connectDatabase} from "./config/config";
const configService = new ConfigService();
import dotenv from 'dotenv';


const port: string = configService.get('PORT');

app.listen(port, async() => {
    dotenv.config();
    console.log("config service", dotenv.config().parsed)
    await connectDatabase();
    console.log(`Server is running on http://localhost:${port}`);
});