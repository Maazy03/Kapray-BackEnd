import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const crypto = require('crypto')

export const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    OTPCode: String,
    OTPCodeExpiry: Date,
    resetPasswordToken:String,
    resetPasswordExpire:Number
})

export interface User extends Document{
    name:String,
    email:String,
    password:String,
    OTPCode: string,
    OTPCodeExpiry: Date,
    resetPasswordToken:String,
    resetPasswordExpire:Number

}

//Sign JWT and return
// UserSchema.methods.getSignedJwtToken = function () {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRE
//     })
//   }
//   //Comparing hashed paswd
//   UserSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword,this.password)
//   }
  
  //Generate and hash password token
//   UserSchema.methods.getResetPasswordToken = function () {
  
//     //Generate Token
//     const resetToken = crypto.randomBytes(20).toString('hex')
  
//     //Hash TOken and set to resetPassword Token field
//     this.resetPasswordToken = crypto.createHash('SHA256').update(resetToken).digest('hex')
  
//     //Set Expire
//     this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
//     return resetToken
  
//   }
  