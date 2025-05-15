import { Router } from "express";
const router = Router();
import { uploadController } from "../controllers/uploadController.js";
import { uploadMiddleware } from "../middlewares/multerMiddleware.js";

router.post("/", uploadMiddleware.any(), uploadController);

export default router;
