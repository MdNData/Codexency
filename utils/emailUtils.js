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

const logoUrl =
  "https://codexency.onrender.com/images/Codexency-logo-full.webp";

export const sendWelcomeEmail = async (userEmail, userName) => {
  const loginUrl = process.env.APP_LOGIN_URL + "/login";

  const mailOptions = {
    from: '"Codexency" <no-reply@codexency.com> ',
    to: userEmail,
    subject: "Bine ai venit!",
    html: `
    <div
        style="
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
            background-color: #041c4c; /* colore principale */
            color: #f5f5f5;           /* testo chiaro per contrasto */
        "
        >
        <img
            src="${logoUrl}"
            alt="Logo"
            style="width: 70%; margin-bottom: 20px; max-width: 350px"
        />
        <h2 style="color: #c5d2e0;">Bine ai venit, ${userName}!</h2>
        <p>
            Îți mulțumim că te-ai înregistrat. Contul tău a fost creat cu succes.
        </p>
        <p>
            Pentru a accesa contul tău, apasă pe butonul de mai jos:
        </p>
        <a
            href="${loginUrl}"
            style="
            display: inline-block;
            padding: 12px 25px;
            margin: 20px 0;
            font-size: 16px;
            color: #ffffff;
            background-color: #06316a; /* variante più chiare di #041c4c */
            text-decoration: none;
            border-radius: 4px;
            border: 1px solid #0a4b8c;
            "
            onmouseover="this.style.backgroundColor='#0a4b8c';"
            onmouseout="this.style.backgroundColor='#06316a';"
        >
            Accesează contul
        </a>
        <p style="color: #aab8cf;">
            Dacă nu ai creat acest cont, te rugăm să ignori acest mesaj.
        </p>
    </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
