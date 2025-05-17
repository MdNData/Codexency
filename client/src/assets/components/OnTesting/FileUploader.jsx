import React, { useState } from "react";
import axios from "axios";
import apiFetch from "../../utils/apiFetch";

export default function FileUploader() {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [uploaded, setUploaded] = useState({
    images: [],
    videos: [],
    pdfs: [],
    others: [],
  });

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("title", title);
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await apiFetch.post("/upload", formData);
      setUploaded(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Carica nuovi file</h2>
      <input
        type="text"
        placeholder="Titolo corso"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />
      <input
        type="file"
        name="files"
        multiple
        onChange={handleFileChange}
        style={{ display: "block", marginBottom: 10 }}
      />
      <button onClick={handleUpload}>Carica</button>

      {/* Anteprime dei file caricati */}
      <div style={{ marginTop: 30 }}>
        {uploaded.images.length > 0 && (
          <>
            <h3>Immagini caricate</h3>
            <div style={{ display: "flex", gap: 10 }}>
              {uploaded.images.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`img-${i}`}
                  style={{ maxWidth: 150, borderRadius: 4 }}
                />
              ))}
            </div>
          </>
        )}

        {uploaded.videos.length > 0 && (
          <>
            <h3>Video caricati</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {uploaded.videos.map((url, i) => {
                const filename = url.split("/").pop();
                return (
                  <video
                    key={i}
                    src={`/media/videos/${filename}`}
                    controls
                    style={{ maxWidth: 300, borderRadius: 4 }}
                  />
                );
              })}
            </div>
          </>
        )}

        {uploaded.pdfs.length > 0 && (
          <>
            <h3>PDF caricati</h3>
            <ul>
              {uploaded.pdfs.map((url, i) => (
                <li key={i}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    Apri PDF {i + 1}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        {uploaded.others.length > 0 && (
          <>
            <h3>Altri file</h3>
            <ul>
              {uploaded.others.map(({ url, originalName }, i) => (
                <li key={i}>
                  <a href={url} download>
                    {originalName}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
