"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsController = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const body_validator_1 = require("../validators/body.validator");
const add_car_dto_1 = require("./dtos/add-car.dto");
const cars_service_1 = require("./cars.service");
const app_error_1 = require("../utils/app-error");
const carsService = new cars_service_1.CarsService();
const router = express_1.default.Router();
router.post('/add', auth_middleware_1.AuthMiddleware, (0, body_validator_1.Body)(add_car_dto_1.AddCarDto), async (req, res, next) => {
    try {
        // Check if the user is an admin
        if (!req.user || req.user.role !== 'admin') {
            throw app_error_1.AppError.forbidden('Only admins can add cars');
        }
        const car = await carsService.addCar(req.body);
        res.status(201).json({
            success: true,
            message: 'Car added successfully',
            data: car
        });
    }
    catch (error) {
        next(error);
    }
});
exports.CarsController = router;
