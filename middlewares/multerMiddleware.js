import multer from "multer";
import path from "path";

//smistamento file in base all'estensione
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "files/others";
    if (file.mimetype.startsWith("image/")) folder = "files/images";
    if (file.mimetype.startsWith("application/pdf")) folder = "files/pdfs";
    if (file.mimetype.startsWith("video/")) folder = "files/videos";

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploadMiddleware = multer({ storage });
