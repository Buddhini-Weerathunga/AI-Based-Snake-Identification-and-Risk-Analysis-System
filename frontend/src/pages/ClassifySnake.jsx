import { useState } from "react";
import { useTranslation } from "react-i18next";
import ImageUpload from "../components/ImageUpload";
import PredictionResult from "../components/PredictionResult";
import api from "../services/api";

function ClassifySnake() {
  const { t } = useTranslation();

  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClassify = async () => {
    if (!selectedFile) {
      alert(t("uploadAlert"));
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await api.post("/predict", formData);

      const snakeKey = response.data.snake;

      setResult({
        snakeKey: snakeKey,
        confidence: `${response.data.confidence}%`,
      });
    } catch (error) {
      console.error(error);
      alert(t("predictionFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "90vh", background: "#f8fafc", padding: "50px" }}>
      <h1 style={{ textAlign: "center", color: "#064e3b", fontSize: "36px" }}>
        {t("classificationTitle")}
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
            {loading ? t("classifying") : t("classifySnake")}
          </button>
        </div>

        <PredictionResult result={result} />
      </div>
    </div>
  );
}

export default ClassifySnake;