import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadMaterial() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploaded(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => navigate("/admin")}
          className="mb-6 px-4 py-2 bg-slate-800 rounded-lg"
        >
          ← Admin Dashboard
        </button>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h1 className="text-3xl font-bold">
            Upload Learning Material
          </h1>

          <p className="text-slate-400 mt-2">
            Upload PDF or other learning material for AI processing.
          </p>

          <input
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-8 w-full bg-slate-800 border border-slate-700 rounded-xl p-4"
          />

          {file && (
            <p className="text-blue-400 mt-4">
              Selected: {file.name}
            </p>
          )}

          <button
            onClick={handleUpload}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
          >
            📤 Upload Material
          </button>

          {uploaded && (
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400">
              ✓ Material uploaded successfully.
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default UploadMaterial;