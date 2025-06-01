import express, {Request, Response, NextFunction} from 'express';
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

router.get('/all', AuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const options = req.user && req.user.role === 'dealer' ? {
            dealer: req.user.userId,
            user: req.query.userId
        } : {user: req.user.userId, dealer: req.query.userId};

        Object.assign(options, req.query);
        const orders = await ordersService.getAllOrders(options, req.user.userId);
        res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            data: orders
        })
    } catch (error) {
        next(error);
    }
})

export const OrdersController = router;