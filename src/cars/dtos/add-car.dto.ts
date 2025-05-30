import Joi from "joi";
export const AddCarDto = Joi.object({
    make: Joi.string().min(2).max(50).required(),
    model: Joi.string().min(2).max(50).required(),
    year: Joi.number().integer().min(1886).max(new Date().getFullYear()).required(),
    vin: Joi.string().length(17).required(), // VIN must be exactly 17 characters
    color: Joi.string().min(3).max(30).required(),
    mileage: Joi.number().integer().min(0).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().max(500).optional()
})