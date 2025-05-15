import path from "path";

export const uploadController = async (req, res) => {
  const images = [],
    pdfs = [],
    videos = [],
    others = [];

  req.files.forEach((file) => {
    const filePath = file.path;

    if (file.mimetype.startsWith("image/")) {
      images.push(filePath);
    } else if (file.mimetype === "application/pdf") {
      pdfs.push(filePath);
    } else if (file.mimetype.startsWith("video/")) {
      videos.push(filePath);
    } else {
      // Sposta i file nella cartella "others"
      const othersPath = path.join("uploads/others", path.basename(filePath));
      others.push(othersPath);
    }
  });

  res.status(201).json({
    msg: "Caricati correttamente",
    images: images,
    videos: videos,
    pdfs: pdfs,
    others: others,
  });
};
