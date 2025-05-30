import Joi from "joi";

export const UpdateCarDto = Joi.object({
    make: Joi.string().min(2).max(50).optional(),
    model: Joi.string().min(2).max(50).optional(),
    year: Joi.number().integer().min(1886).max(new Date().getFullYear()).optional(),
    vin: Joi.string().length(17).optional(), // VIN must be exactly 17 characters
    color: Joi.string().min(3).max(30).optional(),
    mileage: Joi.number().integer().min(0).optional(),
    price: Joi.number().positive().optional(),
    description: Joi.string().max(500).optional(),
    status: Joi.string().valid('sold', 'available', 'reserved').optional()
})