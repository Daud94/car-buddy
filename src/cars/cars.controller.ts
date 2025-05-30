import express, {Request, Response, NextFunction} from 'express';
import {AuthMiddleware} from "../middleware/auth.middleware";
import {Body} from "../validators/body.validator";
import {AddCarDto} from "./dtos/add-car.dto";
import {CarsService} from "./cars.service";
import {AppError} from "../utils/app-error";
import {UpdateCarDto} from "./dtos/update-car.dto";
import {CarQueryDto} from "./dtos/car.query.dto";
import {Query} from "../validators/query.validator";

const carsService = new CarsService();

const router = express.Router();

router.post('/add', AuthMiddleware, Body(AddCarDto), async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        // Check if the user is an admin
        if (!req.user || req.user.role !== 'dealer') {
            throw AppError.forbidden('Only dealers can add cars')
        }
        const car = await carsService.addCar(req.body, req.user.userId);
        res.status(201).json({
            success: true,
            message: 'Car added successfully',
            data: car
        });
    } catch (error) {
        next(error);
    }
})

router.get('/all', AuthMiddleware, Query(CarQueryDto), async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if the user is an admin
        const options = req.user && req.user.role === 'dealer' ? {user: req.user.userId} : {};
        Object.assign(options, req.query);
        const cars = await carsService.getAllCars(options);
        res.status(200).json({
            success: true,
            message: 'Cars retrieved successfully',
            data: cars
        });
    } catch (error) {
        next(error);
    }
})

router.get('/:id/get', AuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carId = req.params.id;
        const car = await carsService.getCarById(carId);
        if (!car) {
            throw AppError.notFound('Car not found');
        }
        res.status(200).json({
            success: true,
            message: 'Car retrieved successfully',
            data: car
        });
    } catch (error) {
        next(error);
    }
})

router.patch('/:id/update', AuthMiddleware, Body(UpdateCarDto), async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if the user is an admin
        if (!req.user || req.user.role !== 'dealer') {
            throw AppError.forbidden('Only dealers can update cars')
        }
        const carId = req.params.id;
        await carsService.updateCar(carId, req.body, req.user.userId);
        res.status(200).json({
            success: true,
            message: 'Car details updated successfully',
        });
    } catch (error) {
        next(error);
    }
})

router.delete('/:id/delete', AuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if the user is an admin
        if (!req.user || req.user.role !== 'dealer') {
            throw AppError.forbidden('Only dealers can update cars')
        }
        const carId = req.params.id;
        await carsService.deleteCar(carId, req.user.userId);
        res.status(200).json({
            success: true,
            message: 'Car deleted successfully'
        })
    } catch (error) {
        next(error)
    }
})

export const CarsController = router;