import { Body, Controller, Post, Req, Put, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from './auth.service'


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('/signup')
    async  signUp(@Req() request: Request, @Res() res: Response) {
            try {
                console.log("SIGN UP")
                const authen = await this.authService.signUp(request)
                console.log("SIGNUP AUTHEN", authen)
                res.status(200).send({
                    responseCode: 200,
                    responseMessage: "User Registered successfully",
                    result: authen,
                });
            }
    
            catch (err) {
                console.log("SIGN UP", err)
                res.status(400).send({
                    responseCode: 400,
                    responseMessage: "Invalid Credentials",
                    result: err,
                });
            }
    }

    @Post('/login')
    async login(
        @Req() request: Request,@Res() res: Response) {
            try {
                console.log("LOGIN TRY")
                const authen = await this.authService.login(request)
                console.log("LOGIN AUTHEN", authen)
                res.status(200).send({
                    responseCode: 200,
                    responseMessage: "User Logged in Succesfullys",
                    result: authen,
                });
            }
    
            catch (err) {
                console.log("LOGIN CATCH", err)
                res.status(400).send({
                    responseCode: 400,
                    responseMessage: "Invalid Credentials",
                    result: err,
                });
            }
    }


    @Post('/verifyEmail')
    async verifyEmail(
        @Req() request: Request,@Res() res: Response) {
            try {
                console.log("VERIFY EMAIL TRY")
                const authen = await this.authService.verifyEmail(request)
                console.log("LOGIN AUTHEN", authen)
                res.status(200).send({
                    responseCode: 200,
                    responseMessage: "An OTP have been sent to your email for registration",
                    result: authen,
                });
            }
    
            catch (err) {
                console.log("VERIFY EMAIL CATCH", err)
                res.status(400).send({
                    responseCode: 400,
                    responseMessage: "Email not verified",
                    result: err,
                });
            }
    }
    @Post('/verifyOTP')
    async verifyOTP(
        @Req() request: Request,@Res() res: Response) {
            try {
                console.log("VERIFY OTP TRY")
                const authen = await this.authService.verifyOTP(request)
                console.log("LOGIN AUTHEN", authen)
                res.status(200).send({
                    responseCode: 200,
                    responseMessage: "Password succesfully set",
                    result: authen,
                });
            }
    
            catch (err) {
                console.log("VERIFY OTP CATCH", err)
                res.status(400).send({
                    responseCode: 400,
                    responseMessage: "Password not successfly set",
                    result: err,
                });
            }
    }
    @Post('/setPassword')
    async setPassword(
        @Req() request: Request,@Res() res: Response) {
            try {
                console.log("SET PASSOWRD TRY")
                const authen = await this.authService.setPassword(request)
                console.log("LOGIN AUTHEN", authen)
                res.status(200).send({
                    responseCode: 200,
                    responseMessage: "Password succesfully set",
                    result: authen,
                });
            }
    
            catch (err) {
                console.log("SET PASSOWRD CATCH", err)
                res.status(400).send({
                    responseCode: 400,
                    responseMessage: "Password not successflu set",
                    result: err,
                });
            }
    }

    @Post('/forgetPassword')
    async forgetPassword(
        @Req() request: Request,@Res() res: Response) {
            try {
                console.log("FORGET PASSOWRD TRY")
                const authen = await this.authService.forgetPassword(request)
                console.log("LOGIN AUTHEN", authen)
                res.status(200).send({
                    responseCode: 200,
                    responseMessage: "Email sent succesfully",
                    result: authen,
                });
            }
    
            catch (err) {
                console.log("FORGET PASSOWRD CATCH", err)
                res.status(400).send({
                    responseCode: 400,
                    responseMessage: "Password not changed",
                    result: err,
                });
            }
    }

    @Put('/reset/:resettoken')
    async resetPassword(
        @Req() request: Request,@Res() res: Response) {
            try {
                console.log("RESET PASSOWRD TRY")
                const authen = await this.authService.resetPassword(request)
                console.log("LOGIN AUTHEN", authen)
                res.status(200).send({
                    responseCode: 200,
                    responseMessage: "Password succesfully changed",
                    result: authen,
                });
            }
    
            catch (err) {
                console.log("RESET PASSOWRD CATCH", err)
                res.status(400).send({
                    responseCode: 400,
                    responseMessage: "Password not changed",
                    result: err,
                });
            }
    }
    @Put('/updatePassword')
    async updatePassword(
        @Req() request: Request, @Res() res: Response) {
        try {
            console.log("UPDATE PASSOWRD TRY")
            const authen = await this.authService.updatePassword(request)
            console.log("LOGIN AUTHEN", authen)
            res.status(200).send({
                responseCode: 200,
                responseMessage: "Password updated",
                result: authen,
            });
        }

        catch (err) {
            console.log("UPDATE PASSOWRD CATCH", err)
            res.status(400).send({
                responseCode: 400,
                responseMessage: "Password not updated",
                result: err,
            });
        }
    }











}