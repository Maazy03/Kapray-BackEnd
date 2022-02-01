import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.model';

@Injectable()
export class OrderService {

    constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) { }

    async placeOrder(request: any) {
        try {

            console.log("PLACE ORDER ", request.body)

            const order = new this.orderModel(request.body)
            return await order.save()
            // console.log("OOOOOOO", order)
            
        }
        catch (err) {
            console.log("ERROR",err)
            throw err
        }

    }


}


