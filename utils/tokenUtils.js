import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  } catch (error) {
    throw new Error("Sesiunea a expirat, vă rugăm să vă logați din nou.");
  }
};

export const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Sesiunea a expirat, vă rugăm să vă logați din nou.");
  }
};