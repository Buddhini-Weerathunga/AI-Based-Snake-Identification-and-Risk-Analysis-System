import RiskCard from "./RiskCard";

function PredictionResult({ result }) {
  const styles = {
    card: {
      background: "white",
      padding: "30px",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      minHeight: "350px",
    },
    empty: {
      color: "#64748b",
      textAlign: "center",
      marginTop: "120px",
      fontSize: "18px",
    },
    title: {
      color: "#064e3b",
      fontSize: "26px",
      marginBottom: "20px",
    },
    row: {
      marginBottom: "14px",
      fontSize: "17px",
      color: "#334155",
    },
    label: {
      fontWeight: "bold",
      color: "#0f172a",
    },
  };

  if (!result) {
    return (
      <div style={styles.card}>
        <p style={styles.empty}>Prediction result will appear here</p>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Classification Result</h2>

      <p style={styles.row}>
        <span style={styles.label}>Snake Name:</span> {result.snakeName}
      </p>

      <p style={styles.row}>
        <span style={styles.label}>Scientific Name:</span> {result.scientificName}
      </p>

      <p style={styles.row}>
        <span style={styles.label}>Confidence:</span> {result.confidence}
      </p>

      <RiskCard riskLevel={result.riskLevel} />

      <p style={styles.row}>
        <span style={styles.label}>Safety Advice:</span> {result.advice}
      </p>
    </div>
  );
}

export default PredictionResult;