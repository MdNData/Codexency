import * as dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  endpoint: process.env.CF_ACCESS_LINK,
  accessKeyId: process.env.CF_ACCESS_KEY_ID,
  secretAccessKey: process.env.CF_SECRET_ACCESS_KEY,
  region: "auto",
  signatureVersion: "v4",
});

export const uploadToR2 = async (filePath, fileName) => {
  const params = {
    Bucket: process.env.CF_BUCKET_NAME,
    Key: fileName,
    Body: fs.createReadStream(filePath),
  };

  const data = await s3.upload(params).promise();
  console.log("File uploaded successfully:", data.Location);
};
