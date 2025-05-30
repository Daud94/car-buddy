import {CarModel} from "./cars.shema";
import {ICar} from "./ICar";
import {AppError} from "../utils/app-error";
import {Types} from "mongoose";

export class CarsService {
    async getCarById(carId: string) {
        return await CarModel.findById(carId).exec();
    }


    async getAllCars(filterQuery: any) {
        const where: { [key: string]: any } = {};
        if (filterQuery.minPrice && filterQuery.maxPrice) {
            where['price'] = {
                $gte: filterQuery.minPrice,
                $lte: filterQuery.maxPrice
            }
        }

        if (filterQuery.minMileage && filterQuery.maxMileage) {
            where['mileage'] = {
                $gte: filterQuery.minMileage,
                $lte: filterQuery.maxMileage
            }
        }

        if (filterQuery.minYear && filterQuery.maxYear) {
            where['year'] = {
                $gte: filterQuery.minYear,
                $lte: filterQuery.maxYear
            }
        }
        where.make = filterQuery.make ? {$regex: filterQuery.make, $options: 'i'} : {$exists: true};
        where.model = filterQuery.model ? {$regex: filterQuery.model, $options: 'i'} : {$exists: true};
        where.color = filterQuery.color ? {$regex: filterQuery.color, $options: 'i'} : {$exists: true};
        where.vin = filterQuery.vin ? {$regex: filterQuery.vin, $options: 'i'} : {$exists: true};
        where.status = filterQuery.status ? {$regex: filterQuery.status, $options: 'i'} : {$exists: true};
        where.user = filterQuery.user ? filterQuery.user : {$exists: true};


        return await CarModel.find({
            ...where
        })
            .sort({make: 1})
            .exec();
    }

    async addCar(carData: ICar, userId: Types.ObjectId) {
        const existingCar = await CarModel.findOne({vin: carData.vin}).exec();
        if (existingCar) throw AppError.badRequest('Car with this VIN already exists');
        const newCar = new CarModel({...carData, user: userId});
        return (await newCar.save()).toJSON();
    }

    async updateCar(carId: string, carData: Partial<ICar>, userId: Types.ObjectId) {
        const existingCar = await CarModel.findOne({_id: carId, user: userId}).exec();
        if (!existingCar) throw AppError.notFound('Car not found');
        Object.assign(existingCar, carData);
        return (await existingCar.save()).toJSON();
    }

    async deleteCar(carId: string, userId: Types.ObjectId) {
        const existingCar = await CarModel.findOne({_id: carId, user: userId}).exec();
        if (!existingCar) throw AppError.notFound('Car not found');
        await CarModel.deleteOne({_id: carId}).exec();
    }
}
