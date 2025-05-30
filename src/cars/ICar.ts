import {AbstractDocument} from "../config/abstract.document";
import {Types} from "mongoose";

export interface ICar extends AbstractDocument{
    user: Types.ObjectId;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    color: string;
    description?: string; // Optional field for additional information
    vin: string; // Vehicle Identification Number
    status: 'sold' | 'available' | 'reserved'; // Status of the car
}