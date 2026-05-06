import { Link } from "react-router-dom";

function Home() {
  const styles = {
    page: {
      minHeight: "90vh",
      background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
    },
    card: {
      maxWidth: "900px",
      textAlign: "center",
      background: "white",
      padding: "60px",
      borderRadius: "24px",
      boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
    },
    title: {
      fontSize: "46px",
      color: "#064e3b",
      marginBottom: "20px",
    },
    text: {
      fontSize: "18px",
      color: "#475569",
      lineHeight: "1.7",
      marginBottom: "30px",
    },
    button: {
      background: "#059669",
      color: "white",
      padding: "14px 28px",
      borderRadius: "12px",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>AI-Based Snake Identification</h1>
        <p style={styles.text}>
          Upload a snake image and identify the snake type, danger level, and basic safety guidance using AI image classification.
        </p>
        <Link to="/classify" style={styles.button}>Start Classification</Link>
      </div>
    </div>
  );
}

export default Home;