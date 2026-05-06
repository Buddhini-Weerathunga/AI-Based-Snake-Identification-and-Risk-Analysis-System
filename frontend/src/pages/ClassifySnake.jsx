import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import PredictionResult from "../components/PredictionResult";

function ClassifySnake() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleClassify = () => {
    if (!image) {
      alert("Please upload a snake image first");
      return;
    }

    setResult({
      snakeName: "Sri Lankan Cobra",
      scientificName: "Naja naja",
      riskLevel: "High Risk",
      confidence: "94%",
      advice: "Keep distance and contact wildlife rescue or emergency medical support if bitten.",
    });
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
      background: "#059669",
      color: "white",
      border: "none",
      padding: "14px",
      borderRadius: "12px",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Snake Image Classification</h1>

      <div style={styles.layout}>
        <div>
          <ImageUpload image={image} setImage={setImage} />
          <button style={styles.button} onClick={handleClassify}>
            Classify Snake
          </button>
        </div>

        <PredictionResult result={result} />
      </div>
    </div>
  );
}

export default ClassifySnake;