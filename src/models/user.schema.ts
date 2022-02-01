import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
const Schema = mongoose.Schema;

export const UserSchema = new mongoose.Schema({
    name: {
         type: String, unqiue: true 
        },
    email: { 
        type: String, unique:true 
    },
    hash: {
         type: String,
        },
     OTPcode: String,
     OTPcodeExpiry: String,
   })

export interface User extends Document {
    name: String,
    email: String,
    hash: String,
    coins:String,
    wallet:String,
    assets:String,
    OTPcode: String,
    OTPcodeExpiry: String,
  }

