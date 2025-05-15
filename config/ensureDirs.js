// src/config/ensureDirs.js
import fs from "fs";
import path from "path";

const dirs = ["files/images", "files/pdfs", "files/videos", "files/others"];

dirs.forEach((dir) => {
  const fullPath = path.resolve(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${fullPath}`);
  }
});
