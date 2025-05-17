import { Router } from "express";
import { r2Client } from "../utils/r2Client.js";

const router = Router();

router.get("/:folder/:filename", (req, res, next) => {
  const { folder, filename } = req.params;
  const objectName = `${folder}/${filename}`;

  // Ottieni l’object stream da R2
  r2Client.getObject(process.env.R2_BUCKET_NAME, objectName, (err, stream) => {
    if (err) return next(err);

    // Aggiungi gli header CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Se vuoi rispondere all’OPTIONS preflight
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }

    // Emetti Content-Type se disponibile
    // (MinIO stream non espone headers, quindi potresti dover derivarlo da filename)
    const ext = filename.split(".").pop().toLowerCase();
    const mime =
      ext === "mp4"
        ? "video/mp4"
        : ext === "webm"
        ? "video/webm"
        : ext === "mov"
        ? "video/quicktime"
        : ext === "jpg"
        ? "image/jpeg"
        : ext === "png"
        ? "image/png"
        : ext === "pdf"
        ? "application/pdf"
        : "application/octet-stream";
    res.setHeader("Content-Type", mime);

    // Pipe diretto il body dello stream al client
    stream.pipe(res);
  });
});

export default router;
