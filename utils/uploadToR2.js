import * as dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { Upload } from "@aws-sdk/lib-storage";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  endpoint: process.env.CF_ACCESS_LINK,
  credentials: {
    accessKeyId: process.env.CF_ACCESS_KEY_ID,
    secretAccessKey: process.env.CF_SECRET_ACCESS_KEY,
  },
  region: "auto",
  signatureVersion: "v4",
});

export const uploadToR2 = async (filePath, fileName) => {
  const params = {
    Bucket: process.env.CF_BUCKET_NAME,
    Key: fileName,
    Body: fs.createReadStream(filePath),
  };

  const data = await new Upload({
    client: s3,
    params,
  }).done();
  console.log("File uploaded successfully:", data.Location);
};

export const getUploadUrlToR2 = async (fileName) => {
  const command = new PutObjectCommand({
    Bucket: process.env.CF_BUCKET_NAME,
    Key: fileName,
    ContentType: "application/octet-stream",
  });

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 3600,
  });
  return signedUrl;
};

export const getLoadUrlToR2 = async (fileName) => {
  const command = new GetObjectCommand({
    Bucket: process.env.CF_BUCKET_NAME,
    Key: fileName,
    ContentType: "application/octet-stream",
  });

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 3600,
  });
  return signedUrl;
};
