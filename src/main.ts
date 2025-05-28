import app from './app';
import {ConfigService} from "./config/config.service";
import {connectDatabase} from "./config/config";
const configService = new ConfigService();


const port: string = configService.get('PORT');
console.log(port)

app.listen(port, async() => {
    await connectDatabase();
    console.log(`Server is running on http://localhost:${port}`);
});