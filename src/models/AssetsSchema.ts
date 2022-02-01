import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
const Schema = mongoose.Schema;

export const CoinsSchema = new mongoose.Schema(
    [{
        name: {
            type: String, required: true, unqiue: true
        },
        volume: {
            type: String, required: true, unique: true
        },
        totalLiquidity: {
            type: String, required: true
        },
        marketPrice: {
            type: Number
        },
        website: {
            type: String
        },
        marketCapRank: {
            type: String
        },
        marketCap: {
            type: Number
        },
        tradingVolume: {
            type: Number
        },
        symbol: {
            type: String
        },
        Address: {
            type: String
        },
        toalPrice: {
            type: Number
        }





    }])

export interface Coins extends Document {
    name: String,
    volume: String,
    totalLiquidity: String,
    marketPrice: Number,
    website: String,
    marketCap: Number,
    marketCapRank: String,
    tradingVolume: Number,
    symbol: String,
    Address: String,
    totalPrice: Number
}

