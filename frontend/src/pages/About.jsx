function About() {
  const styles = {
    page: {
      minHeight: "90vh",
      background: "#f8fafc",
      padding: "60px",
    },
    card: {
      maxWidth: "900px",
      margin: "0 auto",
      background: "white",
      padding: "45px",
      borderRadius: "22px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    },
    title: {
      color: "#064e3b",
      fontSize: "34px",
      marginBottom: "20px",
    },
    text: {
      color: "#475569",
      fontSize: "17px",
      lineHeight: "1.8",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>About This Project</h1>
        <p style={styles.text}>
          This project is an AI-based snake identification and risk analysis system.
          It helps users upload snake images and receive classification results,
          danger level information, and basic safety guidance.
        </p>
      </div>
    </div>
  );
}

export default About;