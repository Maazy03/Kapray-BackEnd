import * as mongoose from 'mongoose'
import { Document } from 'mongoose'

export const OrderSchema = new mongoose.Schema({
    orderItems: [{
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
            maxLength: [30, 'Name should not exceed more than 50 characters']
        },
        cost: {
            type: Number,
            required: true
        },
        photo: {
            type: String,
            default: 'no-photo.jpeg'
        },
    }],
    shippingAddress: {
        contact: {
            type: String,
        },
        country: {
            type: String,
        },
        region: {
            type: String,
        },
        city: {
            type: String,
        },
        area: {
            type: String,
        },
        address: {
            type: String,
        },

    },

})

export interface Order extends Document {

    shippingAddress: {
        contact: {
            type: String,
        },
        country: {
            type: String,
        },
        region: {
            type: String,
        },
        city: {
            type: String,
        },
        area: {
            type: String,
        },
        address: {
            type: String,
        },

    },
    orderItems: [{
        name: {
            type: String,
        },
        cost: {
            type: Number,
 
        },
        photo: {
            type: String,
        },
    }],

}