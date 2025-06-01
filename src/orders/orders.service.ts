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

        car.status = 'ordered';
        await car.save();
    }

    async getOrder(orderId: string) {
        return await OrderModel.findOne({_id: orderId}).populate('car').populate('dealer').exec();
    }

    async getAllOrders(filterQuery: any, userId: string) {
        const where: { [key: string]: any } = {};
        if (filterQuery.dealer){
            where.dealer = filterQuery.dealer;
        }
        if (filterQuery.carId){
            where.car = filterQuery.carId;
        }
        if (filterQuery.status){
            where.status = {$regex: filterQuery.status, $options: 'i'};
        }
        if (filterQuery.user){
            where.user = filterQuery.user;
        }
        if (filterQuery.fromDate && filterQuery.toDate){
            where.orderDate = {
                $gte: new Date(filterQuery.fromDate),
                $lte: new Date(filterQuery.toDate)
            }
        }
        if (where.dealer == userId){
            return await OrderModel.find(where)
                .populate('car')
                .populate('user')
                .sort({createdAt: -1})
                .exec();
        }

        return await OrderModel.find(where)
            .populate('car')
            .populate('dealer')
            .sort({createdAt: -1})
            .exec();

    }
}