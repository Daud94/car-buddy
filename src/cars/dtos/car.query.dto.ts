import Joi from "joi";

export const CarQueryDto = Joi.object({
    search: Joi.string().min(2).max(100).optional(),
    make: Joi.string().min(2).max(50).optional(),
    model: Joi.string().min(2).max(50).optional(),
    minYear: Joi.number().integer().min(1886).max(new Date().getFullYear()).optional(),
    maxYear: Joi.number().integer().min(1886).max(new Date().getFullYear()).optional(),
    vin: Joi.string().length(17).optional(), // VIN must be exactly 17 characters
    color: Joi.string().min(3).max(30).optional(),
    minMileage: Joi.number().integer().min(0).optional(),
    maxMileage: Joi.number().integer().min(0).optional(),
    minPrice: Joi.number().min(0).positive().optional(),
    maxPrice: Joi.number().min(0).positive().optional(),
    status: Joi.string().valid('sold', 'available', 'ordered').optional()
})