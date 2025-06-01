import Joi from "joi";

export const CreateOrderDto = Joi.object({
    carId: Joi.string().required(),
    dealerId: Joi.string().required(),
    note: Joi.string().max(500).optional()
})
