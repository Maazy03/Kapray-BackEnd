import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

    constructor(private readonly orderService: OrderService) { }

    @Post('/placeOrder')
    async placeOrder(
        @Req() request: Request
    ) {

        try {
            console.log("PLACE ORDER TRY")

            const placeOrder = await this.orderService.placeOrder(request)
            console.log("sadsdasdsad", placeOrder)


            // return {
            //     message: "Order Placed",
            //     data: placeOrder
            // }
            return {
                message: "Order Placed",
                data: placeOrder
            }

        } catch (error) {
            console.log("PLACE ORDER CATRCH", error)
            throw error
        }
    }


}


