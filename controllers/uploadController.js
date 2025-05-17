import { createRequire } from "module";
const require = createRequire(import.meta.url);
const BusboyModule = require("busboy");
const Busboy = BusboyModule.default || BusboyModule;

import path from "path";
import { r2Client } from "../utils/r2Client.js";

export const uploadController = (req, res, next) => {
  // chiamala come funzione, non con new
  const bb = Busboy({ headers: req.headers });
  const uploads = [];

  bb.on("file", (fieldname, fileStream, { filename, mimeType }) => {
    const folder = mimeType.startsWith("video/")
      ? "videos"
      : mimeType.startsWith("image/")
      ? "images"
      : mimeType === "application/pdf"
      ? "pdfs"
      : "others";

    const objectName = `${folder}/${Date.now()}_${path.basename(filename)}`;

    const p = new Promise((resolve, reject) => {
      r2Client.putObject(
        process.env.R2_BUCKET_NAME,
        objectName,
        fileStream,
        { "Content-Type": mimeType },
        (err, etag) => {
          if (err) return reject(err);
          const publicUrl = `https://${process.env.R2_BUCKET_NAME}.${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com/${objectName}`;
          resolve({ filename, mimeType, objectName, etag, publicUrl });
        }
      );
    });

    uploads.push(p);
  });

  bb.on("error", (err) => {
    console.error("Busboy error:", err);
    next(err);
  });

  bb.on("finish", async () => {
    try {
      const results = await Promise.all(uploads);

      const images = results
        .filter((r) => r.mimeType.startsWith("image/"))
        .map((r) => r.publicUrl);
      const videos = results
        .filter((r) => r.mimeType.startsWith("video/"))
        .map((r) => r.publicUrl);
      const pdfs = results
        .filter((r) => r.mimeType === "application/pdf")
        .map((r) => r.publicUrl);
      const others = results
        .filter((r) => !/^image\/|^video\/|application\/pdf/.test(r.mimeType))
        .map((r) => ({ url: r.publicUrl, originalName: r.filename }));

      res.status(201).json({ images, videos, pdfs, others });
    } catch (err) {
      console.error("Upload error:", err);
      next(err);
    }
  });

  req.pipe(bb);
};
