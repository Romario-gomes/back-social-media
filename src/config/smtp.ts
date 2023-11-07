import dotenv from "dotenv";
dotenv.config();

export const configSmtp = {
  host: "smtp.gmail.com",
  port: 587,
  user: process.env.GMAIL,
  pass: process.env.PASS_GMAIL,
};
