import User from "../models/UserModel.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  try {
    req.body.password = await hashPassword(req.body.password);
    req.body.passwordChangedAt = Date.now();

    const user = await User.create(req.body);

    const token = createJWT({
      userId: user._id,
      email: user.email,
    });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
    });

    

  } catch (error) {}
};
