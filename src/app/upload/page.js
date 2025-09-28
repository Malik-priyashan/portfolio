"use client";
import { useState } from "react";

export default function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();
    const file = e.target.file.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.url) {
      setImageUrl(data.url);
    } else {
      alert("Upload failed");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Upload Image</h1>
      <form onSubmit={handleUpload}>
        <input type="file" name="file" accept="image/*" required />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {imageUrl && (
        <div className="mt-8 flex justify-center">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden w-80 border border-gray-200">
            <img
              src={imageUrl}
              alt="Project Card"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Project Card</h2>
              <p className="text-xs text-gray-500 break-all">{imageUrl}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
