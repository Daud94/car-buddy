import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
import {AuthService} from "./auth.service";
import {Body} from "../validators/body.validator";
import {RegisterDto} from "./dtos/registerDto";
import {LoginDto} from "./dtos/loginDto";

const authService = new AuthService();

router.post('/register', Body(RegisterDto),async (req:Request, res: Response, next:NextFunction) => {
    try {
        console.log(req.body)
        await authService.register(req.body);
        res.status(201).json({
            success: true,
            message: 'Registration successful',
        });
    } catch (error) {
        next(error);
    }
})

router.post('/login', Body(LoginDto), async (req:Request, res: Response, next:NextFunction) => {
    try{
        const result = await authService.login(req.body);
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result.user,
            authToken: result.token
        });
    } catch (error) {
        next(error);
    }
})


export const AuthController = router;