import path from "path";

export const uploadController = async (req, res) => {
  const images = [],
    pdfs = [],
    videos = [],
    others = [];

  req.files.forEach((file) => {
    const relPath = path.relative(process.cwd(), file.path);
    if (file.mimetype.startsWith("image/")) images.push(relPath);
    else if (file.mimetype === "application/pdf") pdfs.push(relPath);
    else if (file.mimetype.startsWith("video/")) videos.push(relPath);
    else others.push(relPath);
  });

  res.status(201).json({
    msg: "Caricati correttamente",
    images: images,
    videos: videos,
    pdfs: pdfs,
    others: others,
  });
};
