import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import { configSmtp } from "@config/smtp";

export const transporter = nodeMailer.createTransport({
  host: configSmtp.host,
  port: configSmtp.port,
  secure: false,
  auth: {
    user: configSmtp.user,
    pass: configSmtp.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
