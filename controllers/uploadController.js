import {
  getLoadUrlToR2,
  getUploadUrlToR2,
  uploadToR2,
} from "../utils/uploadToR2.js";

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

export const uploadToUrl = async (req, res) => {
  try {
    const fileName = req.body.fileName;
    const url = await getUploadUrlToR2(fileName);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Failed to get upload URL",
      error: error.message,
    });
  }
};

export const loadFromUrl = async (req, res) => {
  try {
    const fileName = req.body.fileName;
    const url = await getLoadUrlToR2(fileName);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Failed to get upload URL",
      error: error.message,
    });
  }
};
