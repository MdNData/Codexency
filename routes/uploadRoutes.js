import { Router } from "express";
const router = Router();
import rateLimiter from "express-rate-limit";
import { upload } from "../utils/multerUploader.js";
import { uploadController } from "../controllers/uploadController.js";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    msg: "Limita încercări depășită, vă rugăm să încercați din nou în 15 minute.",
  },
});

router.post("/", upload.single("file"), uploadController);

export default router;
