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

//Path to public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

//Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

//Use routes

//Default route
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

//Not found
app.use("*", (req, res) => {
  res.status(404);
});

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
