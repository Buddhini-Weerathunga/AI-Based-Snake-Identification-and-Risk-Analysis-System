function ImageUpload({ image, setImage, setSelectedFile }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const styles = {
    card: {
      background: "white",
      padding: "30px",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      textAlign: "center",
    },
    box: {
      border: "2px dashed #10b981",
      borderRadius: "18px",
      padding: "40px",
      background: "#ecfdf5",
    },
    img: {
      marginTop: "20px",
      width: "100%",
      maxHeight: "300px",
      objectFit: "cover",
      borderRadius: "16px",
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.box}>
        <h2>Upload Snake Image</h2>
        <p>Select a clear image of the snake</p>

        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      {image && <img src={image} alt="Uploaded snake" style={styles.img} />}
    </div>
  );
}

export default ImageUpload;