import { Router } from "express";
const router = Router();
import rateLimiter from "express-rate-limit";
import { validateUserRegistration } from "../middlewares/validationMiddleware.js";
import { register } from "../controllers/AuthControllers.js";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    msg: "Limita încercări depășită, vă rugăm să încercați din nou în 15 minute.",
  },
});

router.post("/register", apiLimiter, validateUserRegistration, register);

export default router;
