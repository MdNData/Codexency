import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

//Import routes
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import mediaProxy from "./routes/mediaRoutes.js";

//Path to public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

//Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use("/files", express.static(path.resolve(process.cwd(), "./files")));
app.use(cookieParser());
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        styleSrcElem: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: [
          "'self'",
          "data:",
          `https://${process.env.R2_BUCKET_NAME}.${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        ],
        connectSrc: [
          "'self'",
          `https://${process.env.R2_BUCKET_NAME}.${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
          "http://localhost:5173",
          "http://localhost:5101",
        ],
        mediaSrc: [
          "'self'",
          `https://${process.env.R2_BUCKET_NAME}.${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        ],
        frameSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
    // Disabilitiamo solo la policy che altrimenti bloccherebbe i fetch incrociati
    crossOriginEmbedderPolicy: false,
  })
);
app.use(mongoSanitize());

//Use routes
app.use("/api/access", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/media", mediaProxy);

//Default route
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

//Not found
app.use("*", (req, res) => {
  res.status(404);
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5101;

//Run the server
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
  });
} catch (error) {
  process.exit(1);
}
