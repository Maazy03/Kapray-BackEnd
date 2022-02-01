import { Injectable } from "@nestjs/common";
const nodemailer = require("nodemailer");
require("dotenv").config();

//nodemailer configuration

let transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 587,
  secure: false,
  auth: {
    user: 'muhammadmaaz46@gmail.com',
    pass: "lpzbjctcudqtbtma"
},
requireTLS: true,
});

@Injectable()
export class NodemailerService {
  constructor() {}

  //function to send invoice mail to payer
  sendInvoiceToPayerEmail = async (invoiceData) => {
    try {
      console.log("send Invoice Mail");
      const code = Math.floor(Math.random() * 1000000);
      let info = await transporter.sendMail({
        from: "", // sender address
        to: "" + `${invoiceData.email}`, //receiver email
        subject: "Telemed.App Verification Code", // Subject line
        html: `
                <br/>
                <p>Dear ${invoiceData.name},</p>
                <p><span>Your Verification Code is: <b> ${code} <b/><span/></p>`,
      });
      const mail = {
        info: info,
      };
      return code;
    } catch (e) {
      console.log("catching error in mail==>", e);
      throw "Email not Send";
    }
  };

  sendMailToContactUs = async (invoiceData) => {
    try {
      console.log("ran",invoiceData)
      let info = await transporter.sendMail({
        from: "", // sender address
        to: invoiceData.to, //receiver email
        subject: invoiceData.subject, // Subject line
        html: `
                <br/>
                <p><span> OTP CODE: ${invoiceData.Otp}<b/><span/></p>
                <p><span>Your Verification Code is: <b> ${invoiceData.url} <b/><span/></p>`
      });
      const mail = {
        info: info,
      };
      return mail;
    } catch (e) {
      console.log("catching error in mail==>", e);
      throw "Email not Send";
    }
  };

  Test = async () => {
    try {
      console.log("check email now");
      let info = await transporter.sendMail({
        from: "", // sender address
        to: "" + `${"sarfarazahmedkhankhan@gmail.com"}`, //receiver email
        subject: "Telemed.App report cron job Us", // Subject line
        html: `
                <br/>
                <p><span>Message:<b/><span/></p>`,
      });
      const mail = {
        info: info,
      };
      console.log("mail", mail);
      return mail;
    } catch (e) {
      console.log("catching error in mail==>", e);
      throw e;
    }
  };

  appointmentConfirmation = async (
    invoiceData,
    appointment_details,
    doctor
  ) => {
    try {
      console.log("check email now", invoiceData);
      let info = await transporter.sendMail({
        from: "", // sender address
        to: "" + `${invoiceData.email}`, //receiver email
        subject: "Telemed.App Appointment Confirmation", // Subject line
        html: `
                <br/>
                <span/><b>Appointment Time</b><br/>
                ${appointment_details.date} ${appointment_details.time}<br/>
                <b>Doctor</b><br/>${doctor.name}
                <br/><br/>
                <p>Hi ${invoiceData.name},</p>
                <p><span>Here is a confirmation email that you we have scheduled your appointment with ${doctor.name} on ${appointment_details.date} at ${appointment_details.time}.<b/>
                </p>`,
      });
      const mail = {
        info: info,
      };
      console.log("mail===>", mail);
      return mail;
    } catch (e) {
      console.log("catching error in mail==>", e);
      throw e;
    }
  };

  informDoctor = async (invoiceData, appointment_details, patient) => {
    try {
      let info = await transporter.sendMail({
        from: "", // sender address
        to: "" + `${invoiceData.email}`, //receiver email
        subject: "Telemed.App Appointment Confirmation", // Subject line
        html: `
                <br/>
                <span/><b>Appointment Time</b><br/>
                ${appointment_details.date} ${appointment_details.time}<br/><br/>
                <b>Patient</b><br/>
                ${patient.name}<br/>
                <p>Hi ${invoiceData.name},</p>
                <p><span>Here is a confirmation email that, we have scheduled your appointment with ${patient.name} on ${appointment_details.date} at ${appointment_details.time}.<b/>
                </p>`,
      });
      const mail = {
        info: info,
      };
      return mail;
    } catch (e) {
      console.log("catching error in mail==>", e);
      throw e;
    }
  };

  mailToCustomMail = async (invoiceData) => {
    try {
      const resultFromPayer = await this.sendInvoiceToPayerEmail(invoiceData);
      return resultFromPayer;
    } catch (e) {
      console.log("catching error in mail==>", e);
      throw "Email not Send";
    }
  };

  contactUs = async (invoiceData) => {
    try {
      const resultFromPayer = await this.sendMailToContactUs(invoiceData);
      return resultFromPayer;
    } catch (e) {
      console.log("view error ", e);
      throw "Email not Send";
    }
  };
}
