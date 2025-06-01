import Joi from "joi";

export const OrderQueryDto = Joi.object({
    orderId: Joi.string().optional(),
    userId: Joi.string().optional(),
    carId: Joi.string().optional(),
    status: Joi.string().valid('pending', 'completed', 'cancelled').optional(),
    fromDate: Joi.date().optional(),
    toDate: Joi.date().optional(),
    limit: Joi.number().integer().min(1).max(100).default(10).optional(),
    page: Joi.number().integer().min(1).default(1).optional(),
})