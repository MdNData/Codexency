import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import mediaProxy from "./routes/mediaRoutes.js";

import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

// __dirname setup
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Morgan logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Dynamic CORS whitelist
const whitelist = [
  process.env.FRONTEND_URL_DEV || "http://localhost:5173",
  process.env.FRONTEND_URL_PROD || "https://codexency.onrender.com",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (whitelist.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Security headers
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
          process.env.FRONTEND_URL_DEV || "http://localhost:5173",
          process.env.FRONTEND_URL_PROD || "https://codexency.onrender.com",
          `http://localhost:${process.env.PORT || 5101}`,
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
    crossOriginEmbedderPolicy: false,
  })
);

// Sanitization
app.use(mongoSanitize());

// Static files
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use("/files", express.static(path.resolve(process.cwd(), "./files")));

// Routes
app.use("/api/access", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/media", mediaProxy);

// Default SPA route
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler
app.use(errorHandlerMiddleware);

// Start
const port = process.env.PORT || 5101;
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server running on port ${port}...`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
