import React, { useState } from "react";
import axios from "axios";

export default function FileUploader() {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("title", title);
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(
        "Corso creato:",
        res.data.images,
        res.data.videos,
        res.data.pdfs,
        res.data.others
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Titolo corso"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="file" multiple onChange={handleFileChange} />{" "}
      {/* upload multipli :contentReference[oaicite:7]{index=7} */}
      <button onClick={handleUpload}>Carica</button>
      <video
        src={`https://codexency.onrender.com/files/videos/1.0Curatarea%20instrumentarului.MOV`}
        controls
      />
    </div>
  );
}
