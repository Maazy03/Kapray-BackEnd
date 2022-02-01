import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
const Schema = mongoose.Schema;

export const WalletSchema = new mongoose.Schema({
    publicKey: {
        type: String,
        required: true,
        unique: true
    },
    privateKey: {
        type: String,
        required: true,
        unique: true
    },
    seedPhrase: {
        required: true,
        unique: true,
        type: String
    },
    Balance: {
        type: Number
    },
    Assets: {
        type: Schema.Types.ObjectId,
        ref: 'Assets'
    },
    Coins: {
        type: Schema.Types.ObjectId,
        ref: 'Coins'
    },

})

export interface Wallet extends Document {
    publicKey: String,
    privateKey: String,
    seedPhrase: String,
    Balance: Number,
    Assets: String,
    Coins: String
}

