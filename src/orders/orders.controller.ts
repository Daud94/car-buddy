import express, { Request, Response, NextFunction } from 'express';
import {CreateOrderDto} from "./dtos/create-order.dto";
import {AuthMiddleware} from "../middleware/auth.middleware";
import {Body} from "../validators/body.validator";
import {OrdersService} from "./orders.service";
const router = express.Router();
const ordersService = new OrdersService();

router.post('/create', AuthMiddleware, Body(CreateOrderDto), async (req: Request, res: Response, next: NextFunction) => {
    await ordersService.createOrder(req.body, req.user.userId);
    res.status(201).json({
        success: true,
        message: "Order created successfully",
    })
})

export const OrdersController = router;