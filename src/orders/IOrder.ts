import {AbstractDocument} from "../config/abstract.document";

export interface IOrder extends AbstractDocument {
    user: string;
    dealer: string;
    car: string;
    orderDate: Date;
    deliveryDate?: Date;
    paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
    status: 'pending' | 'completed' | 'cancelled';
    totalPrice: number;
    note?: string;
}