function RiskCard({ riskLevel }) {
  const isHigh = riskLevel === "High Risk";

  const styles = {
    card: {
      background: isHigh ? "#fee2e2" : "#dcfce7",
      color: isHigh ? "#991b1b" : "#166534",
      padding: "16px",
      borderRadius: "14px",
      margin: "20px 0",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: "18px",
    },
  };

  return <div style={styles.card}>Risk Level: {riskLevel}</div>;
}

export default RiskCard;