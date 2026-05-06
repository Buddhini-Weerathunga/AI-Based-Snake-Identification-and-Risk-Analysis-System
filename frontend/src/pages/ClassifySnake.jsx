import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import PredictionResult from "../components/PredictionResult";
import api from "../services/api";

function ClassifySnake() {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const snakeDetails = {
    Cobra: {
      scientificName: "Naja naja",
      riskLevel: "High Risk",
      advice:
        "Keep distance immediately. Do not try to catch or touch the snake. Contact wildlife rescue or emergency medical help if bitten.",
    },
    "Russell Viper": {
      scientificName: "Daboia russelii",
      riskLevel: "High Risk",
      advice:
        "Very dangerous venomous snake. Avoid movement near the snake and seek emergency medical support if bitten.",
    },
    Krait: {
      scientificName: "Bungarus caeruleus",
      riskLevel: "High Risk",
      advice:
        "Highly venomous snake. Avoid handling and get urgent medical attention if bitten.",
    },
    Python: {
      scientificName: "Python molurus",
      riskLevel: "Low Risk",
      advice:
        "Usually non-venomous, but can still be dangerous due to size. Keep distance and call wildlife rescue.",
    },
    "Hump Nosed Viper": {
      scientificName: "Hypnale hypnale",
      riskLevel: "Medium Risk",
      advice:
        "Venomous snake. Do not touch it. Seek medical help if bitten.",
    },
    "Green Pit Viper": {
      scientificName: "Trimeresurus trigonocephalus",
      riskLevel: "Medium Risk",
      advice:
        "Venomous snake. Keep distance and get medical advice if bitten.",
    },
  };

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

      const response = await api.post("/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const predictedSnake = response.data.snake;
      const confidence = response.data.confidence;

      const details = snakeDetails[predictedSnake] || {
        scientificName: "Unknown",
        riskLevel: "Unknown",
        advice: "Please verify with an expert before taking action.",
      };

      setResult({
        snakeName: predictedSnake,
        scientificName: details.scientificName,
        riskLevel: details.riskLevel,
        confidence: `${confidence}%`,
        advice: details.advice,
      });
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Check backend server.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: "90vh",
      background: "#f8fafc",
      padding: "50px",
    },
    title: {
      textAlign: "center",
      color: "#064e3b",
      fontSize: "36px",
      marginBottom: "30px",
    },
    layout: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "30px",
      maxWidth: "1100px",
      margin: "0 auto",
    },
    button: {
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
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Snake Image Classification</h1>

      <div style={styles.layout}>
        <div>
          <ImageUpload
            image={image}
            setImage={setImage}
            setSelectedFile={setSelectedFile}
          />

          <button style={styles.button} onClick={handleClassify} disabled={loading}>
            {loading ? "Classifying..." : "Classify Snake"}
          </button>
        </div>

        <PredictionResult result={result} />
      </div>
    </div>
  );
}

export default ClassifySnake;