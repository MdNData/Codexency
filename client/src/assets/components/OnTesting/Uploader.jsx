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
      setMessage("Please select a file.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ ${data.message} (${data.fileName})`);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage("❌ Upload failed. Try again.");
    }

    setUploading(false);
  };

  return (
    <div className="uploader" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Upload file / video to Cloudflare R2</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button
          type="submit"
          disabled={uploading}
          style={{ marginTop: "10px" }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default Uploader;
