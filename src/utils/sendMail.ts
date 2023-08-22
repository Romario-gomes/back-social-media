import nodeMailer from "nodemailer";

import { configSmtp } from "@config/smtp";

export const transporter = nodeMailer.createTransport({
  host: configSmtp.host,
  port: configSmtp.port,
  secure: false,
  auth: {
    user: configSmtp.user,
    pass: process.env.PASS_GMAIL || configSmtp.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
