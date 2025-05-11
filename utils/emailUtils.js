import * as dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendWelcomeEmail = async (userEmail, userName) => {
  const logoUrl =
    "https://codexency.onrender.com/images/Codexency-logo-full.webp";
  const loginUrl = process.env.APP_LOGIN_URL;

  
};
