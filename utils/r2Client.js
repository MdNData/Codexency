import dotenv from "dotenv";
dotenv.config();

import { Client as MinioClient } from "minio";

export const r2Client = new MinioClient({
  endPoint: `${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  port: 443,
  useSSL: true,
  accessKey: process.env.R2_ACCESS_KEY_ID,
  secretKey: process.env.R2_SECRET_ACCESS_KEY,
  region: "auto",
});
