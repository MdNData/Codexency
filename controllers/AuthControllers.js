import User from "../models/UserModel.js";
import { sendWelcomeEmail } from "../utils/emailUtils.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
  try {
    req.body.password = await hashPassword(req.body.password);
    req.body.passwordChangedAt = Date.now();
    req.body.marketing = req.body.marketing === "on";

    const user = await User.create(req.body);

    const token = createJWT({
      userId: user._id,
      email: user.email,
    });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay * 30),
      secure: process.env.NODE_ENV === "production",
    });

    sendWelcomeEmail(user.email, user.nume).catch((err) => {
      console.error("Eroare la trimiterea emailului de bun venit:", err);
    });

    res
      .status(StatusCodes.CREATED)
      .json({ msg: "Utilizator creat cu success" });
  } catch (error) {
    console.error("Eroare la înregistrarea utilizatorului:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Eroare la înregistrarea utilizatorului" });
  }
};
