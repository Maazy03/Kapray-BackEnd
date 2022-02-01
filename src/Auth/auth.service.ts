import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, of } from 'rxjs';
import { User } from './auth.model';
// const bcrypt = require('bcrypt')
import * as bcrypt from 'bcrypt';
import generateToken from './generateToken';
// import nodemailer from "nodemailer";
import { NodemailerService } from "../nodemailer/nodemailer.service"
import * as crypto from "crypto";




@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User') private readonly authModel: Model<User>,
    // @InjectModel('Student') private readonly studentModel: Model<Student>,
    // @InjectModel('Driver') private readonly driverModel: Model<Driver>,
    private readonly jwtService: JwtService,
    private readonly mailerService: NodemailerService

    // private readonly mailerService: MailerService
  ) { }




  /*************************** SIgn UP ***************************/
  async signUp(request) {
    try {
      console.log("SIGNUP -->",request.body.email)
      let { email }=request.body
      let { name }=request.body
      let user = await this.authModel.findOne({ email })
      console.log("user data", user)

      if (user) {
        throw 'Email Already Verified'
      }
      console.log("ENAI",email)
      var hash = await bcrypt.hashSync(request.body.password, 10);
      console.log("hash", hash)
      const newUser = new this.authModel({
        email:email,
        password: hash,
        name:name
      });
      const result = await newUser.save();
      console.log(result);
      return result;

    } catch (error) {
      throw (error)

    }

  }





  /*************************** Login ***************************/
  async login(request) {
    console.log('sssssssssss', request.body)
    try {
      let email = request.body.email
      let password = request.body.password
      const user = await this.authModel.findOne({ email })
      console.log("user data", user)

      if (!user) {
        throw 'Invalid Email'
      }

      else {

        if (!await bcrypt.compare(password, user.password)) {
          throw 'Invalid Password'

        }

        else {
          console.log("login complete", user)
          console.log("Token", generateToken(user._id))

          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
          }
        }
        //   return null

        // return user
      }
    } catch (error) {
      console.log("ERRRR---", error)
      throw error

    }

  }


  /*************************** Verify Email ***************************/
  async verifyEmail(request) {
    console.log('sssssssssss', request.body)
    try {
      let email = request.body.email
      let user = await this.authModel.findOne({ email })
      console.log("user data", user)

      if (user) {
        throw 'Email Already Verified'
      }

      let OTPCodeExpiry = new Date();
      let OTPCode = Math.floor(100000 + Math.random() * 900000);
      try {
        user = new this.authModel(
          {
            email,
            OTPCodeExpiry,
            OTPCode
          }

        );

        const mail = await this.mailerService.sendMailToContactUs({ to: email, subject: "REGISTARTION OTP", Otp: OTPCode })
        console.log("MAIL--->", mail)
        await user.save();
      }
      catch (error) {
        throw error
      }
      return user


    } catch (error) {
      console.log("ERRRR---", error)
      throw error

    }

  }
  async verifyOTP(request) {
    try {

      let { email } = request.body;
      let { OTPCode } = request.body;
      let currentTime = new Date();
      let userEmail = await this.authModel.findOne({ email })
      console.log("user data", userEmail)

      if (!userEmail) {
        throw 'Invalid Email'
      }

      currentTime.setHours(currentTime.getHours() - 1);
      let user = await this.authModel.findOne({
        email,
        OTPCode,
        OTPCodeExpiry: { $gt: currentTime },
      })

      if (user) {
        let registered = await this.authModel.findOneAndUpdate(
          { email },
          { OTPCode: '' }

        );
        if (registered) {
        return "OTP Verified"
        }

      }
      else {
        throw "Invalid OTP"
      }
    }
    catch (err) {
      throw err

    }
  }
  async setPassword(request) {
    try {

      let { email } = request.body;
      let { password } = request.body;
      let user = await this.authModel.findOne({ email })
      if (!user) {
        throw 'Invalid Email'
      }
      var hash = await bcrypt.hashSync(password, 10);

      let registeredUser = await this.authModel.findOneAndUpdate(
        { email },
        { password: hash }

      );
      if (registeredUser) {

        const currentUser = await this.authModel.findOne({ email })
        console.log("currentUSer SP", currentUser)
        const jwt = generateToken(currentUser._id);

        return  {
            user: currentUser,
            token: jwt,
          }
      
      }
      else {
        throw "User not found"
      }

    }
    catch (err) {
      throw err

    }
  }

  async forgetPassword(req) {
    try {
      console.log("run");
      let { email } = req.body;
      req.body.email = email.toLowerCase();
      const getUser = await this.authModel.findOne({ email: email });
      if (getUser == null) throw "account not registered with this email";
      console.log("run2")
      const jwt = generateToken(getUser._id);
      console.log("run2")

      console.log("TOKEN", jwt);

      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetPasswordToken = crypto
        .createHash("SHA256")
        .update(resetToken)
        .digest("hex");
      const resetPasswordExpire = Date.now() + 30 * 60 * 1000;
      console.log(
        "TOKENS",
        resetToken,
        resetPasswordToken,
        resetPasswordExpire
      );
      // const resetUrl = `${req.protocol}://${req.get(
      //   "host"
      // )}/auth/reset/${resetToken}`;

      const resetUrl = `https://kapray.herokuapp.com/auth/reset/${resetToken}`;

      const message = `You have received rest password email ${resetUrl}`;

      try {
        const mail = await this.mailerService.sendMailToContactUs({
          to: email,
          subject: "RESET PASSWORD TOKEN",
          url: message
        });
        await getUser.save({ validateBeforeSave: false });
        getUser.password = undefined;
        getUser.resetPasswordToken = resetPasswordToken;
        getUser.resetPasswordExpire = resetPasswordExpire;

        await getUser.save();
      } catch (error) {
        console.log("no1", error);
        getUser.resetPasswordToken = undefined;
        getUser.resetPasswordExpire = undefined;
        await getUser.save({ validateBeforeSave: false });
        throw "email could not be sent";
      }
      console.log("USER", getUser);
      return getUser;
    } catch (e) {
      console.log("check error", e);

      throw e;
    }
  }

  async resetPassword(req) {
    try {
      console.log("RESET PASSWORD", req.params);
      const resToken = req.params.resettoken
      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(resToken)
        .digest("hex");

      let { newPassword } = req.body

      const user = await this.authModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
      console.log("TOKEN USER", user);
      if (!user) {
        throw "Invalid Token";
      }
      var hash = await bcrypt.hashSync(newPassword, 10);
      user.password = hash;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      console.log("USER---:", user);
      const jwt = generateToken(user._id);
      console.log("JWT RESET", jwt);
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        // contacts: user.contacts,
        token: jwt,
      };
    } catch (e) {
      console.log("check error", e);

      throw e;
    }
  }
  async updatePassword(req) {
    try {
      console.log("UPDATE PASSWORD", req.body.oldPassword);
      let { newPassword } = req.body
      let { oldPassword } = req.body
      let { email } = req.body

      const user = await this.authModel.findOne({
        email
      });
      console.log("UPDATE PASSWORD USER", user);
      if (!user) {
        throw "Invalid EMAIL";
      }
      if (!await bcrypt.compare(oldPassword, user.password)) {
        throw "incorrect Old password"
      }
      const jwt = generateToken(user._id);
      var hash = await bcrypt.hashSync(newPassword, 10);
      user.password = hash
      await user.save({ validateBeforeSave: false });
      return {
        data:user,
        token:jwt

      }

    } catch (e) {
      console.log("check error", e);
      throw e;
    }
  }


}
