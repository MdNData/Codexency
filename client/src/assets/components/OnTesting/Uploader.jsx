import React, { useState } from "react";

const Uploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("📂 Seleziona un file prima di caricare.");
      return;
    }

    setUploading(true);

    try {
      // Step 1: Ottieni signed URL dal backend
      const getUrlRes = await fetch("/api/files/upload-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName: file.name }),
      });

      if (!getUrlRes.ok) {
        throw new Error("Impossibile ottenere l'URL di caricamento.");
      }

      const { url } = await getUrlRes.json();

      // Step 2: Carica direttamente su Cloudflare R2 usando l'URL
      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Errore durante il caricamento su R2.");
      }

      setMessage(
        `✅ File caricato con successo su Cloudflare R2 (${file.name})`
      );
    } catch (error) {
      console.error(error);
      setMessage(`❌ Errore: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="uploader"
      style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}
    >
      <h2>Upload file / video su Cloudflare R2</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button
          type="submit"
          disabled={uploading}
          style={{ marginTop: "10px", padding: "0.5rem 1rem" }}
        >
          {uploading ? "Caricamento in corso..." : "Carica"}
        </button>
      </form>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default Uploader;
