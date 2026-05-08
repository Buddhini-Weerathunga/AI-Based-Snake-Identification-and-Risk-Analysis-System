import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { UploadCloud } from "lucide-react";
import api from "../services/api";

function ClassifySnake() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleClassify = async () => {
    if (!selectedFile) {
      alert(t("uploadAlert"));
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      const response = await api.post("/predict", formData);
      navigate("/result", {
        state: {
          snakeKey: response.data.snake,
          confidence: `${response.data.confidence}%`,
          image,
        },
      });
    } catch (error) {
      console.error(error);
      alert(t("predictionFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0fdf4 0%, #f8fafc 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      fontFamily: "Arial, sans-serif",
      padding: "104px 24px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: "520px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#064e3b", margin: "0 0 8px" }}>
            {t("classificationTitle")}
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
            {t("uploadSubtitle", "Upload a clear snake image for instant AI identification")}
          </p>
        </div>

        {/* Upload Card */}
        <div style={{
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}>

          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("fileInput").click()}
            style={{
              border: "2px dashed #10b981",
              borderRadius: "16px",
              margin: "20px",
              background: "#f0fdf4",
              cursor: "pointer",
              textAlign: "center",
              overflow: "hidden",
              padding: image ? "0" : "48px 20px",
            }}
          >
            {image ? (
              <img
                src={image}
                alt="preview"
                style={{ width: "100%", maxHeight: "300px", objectFit: "cover", display: "block" }}
              />
            ) : (
              <div>
                <div style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  background: "#dcfce7", display: "flex", alignItems: "center",
                  justifyContent: "center", margin: "0 auto 16px",
                }}>
                  <UploadCloud size={30} color="#059669" />
                </div>
                <p style={{ fontWeight: "700", color: "#0f172a", fontSize: "16px", margin: "0 0 6px" }}>
                  {t("dropzoneTitle", "Drop your image here")}
                </p>
                <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 16px" }}>
                  {t("dropzoneSubtitle", "or click to browse — JPG, PNG supported")}
                </p>
                <span style={{
                  display: "inline-block", padding: "8px 20px",
                  background: "#059669", color: "white",
                  borderRadius: "8px", fontSize: "13px", fontWeight: "600",
                }}>
                  {t("browseFile", "Browse File")}
                </span>
              </div>
            )}
          </div>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {/* Change image */}
          {image && (
            <div style={{ textAlign: "center", marginBottom: "8px" }}>
              <button
                onClick={() => document.getElementById("fileInput").click()}
                style={{
                  background: "none", border: "none", color: "#059669",
                  fontSize: "13px", cursor: "pointer", fontWeight: "600",
                }}
              >
                {t("changeImage", "Change Image")}
              </button>
            </div>
          )}

          {/* Classify Button */}
          <div style={{ padding: "0 20px 20px" }}>
            <button
              onClick={handleClassify}
              disabled={loading || !selectedFile}
              style={{
                width: "100%",
                background: loading || !selectedFile ? "#94a3b8" : "#059669",
                color: "white",
                border: "none",
                padding: "14px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: loading || !selectedFile ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loading ? t("classifying") : ("Classify Snake")}
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <p style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8", marginTop: "16px" }}>
          {t("disclaimer", "AI-based identification. Always consult a wildlife expert for confirmation.")}
        </p>
      </div>
    </div>
  );
}

export default ClassifySnake;
