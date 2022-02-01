import * as mongoose from 'mongoose'
import { Document } from 'mongoose'

export const ProductsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    shopNo: { type: String, required: true }
})

export interface Product extends Document {
    name: String,
    image: String,
    shopNo: String
}