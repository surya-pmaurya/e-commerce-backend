import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from 'nodemailer'
import { EMAIL_M } from "../constants/email-constants";


@Injectable()
export class MailService {
  private logger = new Logger(MailService.name);
  private transport;
  constructor() { 
     this.transport=nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure:true,
        port:465,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })
  }
  

  /**
   *Sending offer mail when new Offer Launched
   *
   * @param {string} to
   * @param {string} subject
   * @param {string} username
   * @param {*} data
   * @memberof MailService
   */
  async offerMail(to: string, subject: string, username: string, data: any) {
     await this.transport.sendMail({
      to: to,
      from: EMAIL_M.EMAIL,
      subject: subject,
      text: "A new offer just launched!",
      html: `
  <h1>Hi  ${username} </h1>
  <p>We have got a special offer for you!</p>
  <strong>${data.name}</strong>: ${data.title}`,
    });
  }

  /**
   *when a user register get a verification mail
   *
   * @param {string} email
   * @param {string} username
   * @memberof MailService
   */
  async signupMail(email: string, username: string) {
    await this.transport.sendMail({
      from: EMAIL_M.EMAIL,
      to: email,
      subject: 'Welcome to the E-Commerce Backend System',
      text: `Hello ${username} You have successfully logedin`
    })
     this.logger.log(`[Email sent] To ${email}`)
  }


  /**
   *Sending reset password mail // reset Link and OTP
   *
   * @param {string} email
   * @param {string} resetLink
   * @param {number} randomToken
   * @memberof MailService
   */
  async sendResetMail(email: string, resetLink: string, randomToken: number) {
    await this.transport.sendMail({
      from: EMAIL_M.EMAIL,
      to: email,
      subject: "Reset Your Password",
      text: `click the follwoing link to reset your password ${resetLink} \n Verification Code: ${randomToken}`,
    });
     this.logger.log(`[Eamil Sent] To: ${email}`);
  }
}
