import {model, Schema, Types} from "mongoose";

const schemaDefinition = {
    user: {type: Types.ObjectId, ref: 'User', required: true}, // Reference to the User model
    make: {type: String, required: true},
    model: {type: String, required: true},
    year: {type: Number, required: true},
    price: {type: Number, required: true},
    mileage: {type: Number, required: true},
    vin: {type: String, required: true, unique: true},
    color: {type: String, required: true},
    description: {type: String, required: false},
    status: {type: String, required: true, enum: ['sold', 'available', 'reserved'], default: 'available'},
} as const; // Define the schema definition with TypeScript's 'as const' for better type inference

const carsSchema = new Schema(schemaDefinition, {timestamps:true});
carsSchema.index({make: 'text', model: 'text', color: 'text', description: 'text'}); // Full-text search index
export const CarModel = model('Car', carsSchema, 'cars'); // 'cars' is the collection name in MongoDB