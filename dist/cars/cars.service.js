"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsService = void 0;
const cars_shema_1 = require("./cars.shema");
const app_error_1 = require("../utils/app-error");
class CarsService {
    async getCarById(carId) {
        return await cars_shema_1.CarModel.findById(carId).exec();
    }
    async getCar(filterQuery) {
        return await cars_shema_1.CarModel.findOne(filterQuery).exec();
    }
    async addCar(carData) {
        const existingCar = await this.getCar({ vin: carData.vin });
        if (!existingCar)
            throw app_error_1.AppError.badRequest('Car with this VIN already exists');
        const newCar = new cars_shema_1.CarModel(carData);
        return await newCar.save();
    }
}
exports.CarsService = CarsService;
