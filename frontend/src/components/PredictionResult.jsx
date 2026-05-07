import { useTranslation } from "react-i18next";
import RiskCard from "./RiskCard";

function PredictionResult({ result }) {
  const { t } = useTranslation();

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
        <p style={styles.empty}>{t("predictionEmpty")}</p>
      </div>
    );
  }

  const snakePath = `snakes.${result.snakeKey}`;

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{t("classificationResult")}</h2>

      <p style={styles.row}>
        <span style={styles.label}>{t("snakeName")}:</span>{" "}
        {t(`${snakePath}.name`)}
      </p>

      <p style={styles.row}>
        <span style={styles.label}>{t("scientificName")}:</span>{" "}
        {t(`${snakePath}.scientificName`)}
      </p>

      <p style={styles.row}>
        <span style={styles.label}>{t("confidence")}:</span>{" "}
        {result.confidence}
      </p>

      <RiskCard riskLevel={t(`${snakePath}.riskLevel`)} />

      <p style={styles.row}>
        <span style={styles.label}>{t("safetyAdvice")}:</span>{" "}
        {t(`${snakePath}.advice`)}
      </p>
    </div>
  );
}

export default PredictionResult;