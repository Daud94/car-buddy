"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModel = void 0;
const mongoose_1 = require("mongoose");
const schemaDefinition = {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, required: true },
    vin: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, required: true, enum: ['sold', 'available', 'reserved'], default: 'available' },
};
const carsSchema = new mongoose_1.Schema(schemaDefinition, { timestamps: true });
exports.CarModel = (0, mongoose_1.model)('Car', carsSchema, 'cars'); // 'cars' is the collection name in MongoDB
