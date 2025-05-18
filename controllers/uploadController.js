import { uploadToR2 } from "../utils/uploadToR2.js";

export const uploadController = async (req, res) => {
  try {
    await uploadToR2(req.file.path, req.file.filename);
    res.send({
      status: "success",
      message: "File uploaded successfully",
      fileName: req.file.filename,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "File upload failed",
      error: error.message,
    });
  }
};
