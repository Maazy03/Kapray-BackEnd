import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
const Schema = mongoose.Schema;

export const CoinsSchema = new mongoose.Schema({
    name: {
        type: String, required: true, unqiue: true
    },
    blockChainName: {
        type: String
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
    contract: {
        type: String
    },
    website: {
        type: String
    },
    marketCapRank: {
        type: Number
    },
    circulatingSupply: {
        type: Number
    },
    allTimeHigh: {
        type: Number
    },
    allTimeLow: {
        type: Number
    },
    marketCap: {
        type: Number
    },
    tradingVolume: {
        type: Number
    },
    transaction: {
        type: Number
    },
    symbol: {
        type: String
    },
    Address: {
        type: String
    }

})

export interface Coins extends Document {
    name: String,
    blockChainName: String,
    volume: String,
    totalLiquidity: String,
    marketPrice: Number,
    contract: String,
    website: String,
    marketCapRank: Number,
    circulatingSupply: Number,
    allTimeHigh: Number,
    allTimeLow: Number,
    marketCap: Number,
    tradingVolume: Number,
    transaction: Number,
    symbol: String,
    Address: String
}

