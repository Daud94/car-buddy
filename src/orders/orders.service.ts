import {IOrder} from "./IOrder";
import {OrderModel} from "./orders.schema";
import {AppError} from "../utils/app-error";
import {CarsService} from "../cars/cars.service";

const carsService = new CarsService();

export class OrdersService {
    async createOrder(orderData: any, userId: string) {
        // Check for duplicate within last 5 minutes
        const recentDuplicate = await OrderModel.findOne({
            user: userId,
            car: orderData.carId,
            createdAt: {$gte: new Date(Date.now() - 5 * 60 * 1000)},
            status: {$nin: ['cancelled']}
        });
        if (recentDuplicate) {
            throw AppError.conflict('Duplicate order detected');
        }

        // Check if the car exists
        const car = await carsService.getCarById(orderData.carId);
        if (!car) {
            throw AppError.notFound('Car not found');
        }

        if (car.status !== 'available') {
            throw AppError.badRequest('Car is not available for order');
        }
        await OrderModel.create({
            ...orderData,
            car: orderData.carId,
            dealer: orderData.dealerId,
            price: car.price,
            user: userId
        });
    }
}