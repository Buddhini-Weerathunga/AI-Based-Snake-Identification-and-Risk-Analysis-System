import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import PredictionResult from "../components/PredictionResult";
import api from "../services/api";

function ClassifySnake() {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClassify = async () => {
    if (!selectedFile) {
      alert("Please upload a snake image first");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await api.post("/predict", formData);

      setResult({
        snakeName: response.data.displayName,
        scientificName: response.data.scientificName,
        riskLevel: response.data.riskLevel,
        confidence: `${response.data.confidence}%`,
        advice: response.data.advice,
      });
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Check Flask backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "90vh", background: "#f8fafc", padding: "50px" }}>
      <h1 style={{ textAlign: "center", color: "#064e3b", fontSize: "36px" }}>
        Snake Image Classification
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          maxWidth: "1100px",
          margin: "30px auto",
        }}
      >
        <div>
          <ImageUpload
            image={image}
            setImage={setImage}
            setSelectedFile={setSelectedFile}
          />

          <button
            onClick={handleClassify}
            disabled={loading}
            style={{
              marginTop: "20px",
              width: "100%",
              background: loading ? "#94a3b8" : "#059669",
              color: "white",
              border: "none",
              padding: "14px",
              borderRadius: "12px",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
            }}
          >
            {loading ? "Classifying..." : "Classify Snake"}
          </button>
        </div>

        <PredictionResult result={result} />
      </div>
    </div>
  );
}

export default ClassifySnake;