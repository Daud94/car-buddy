import {model, Schema, Types} from "mongoose";

const schemaDefinition = {
    user: {type: Types.ObjectId, ref: 'User', required: true}, // Reference to the User model
    dealer: {type: Types.ObjectId, ref: 'User', required: true}, // Reference to the User model for dealer
    car: {type: Types.ObjectId, ref: 'Car', required: true}, // Reference to the Car model
    orderDate: {type: Date, required: true, default: Date.now},
    deliveryDate: {type: Date, required: false},
    paymentMethod: {type: String, required: false, enum: ['credit_card', 'paypal', 'bank_transfer']},
    status: {type: String, required: true, enum: ['pending', 'confirmed', 'cancelled', 'delivered'], default: 'pending'},
    price: {type: Number, required: true},
    note: {type: String, required: false},
}

const ordersSchema = new Schema(schemaDefinition, {timestamps: true});
ordersSchema.index({orderDate: -1}); // Index for order date for faster queries
export const OrderModel = model('Order', ordersSchema, 'orders'); // 'orders' is the collection name in MongoDB