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
      padding: "20px",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      textAlign: "center",
    },
    box: {
      border: "2px dashed #10b981",
      borderRadius: "14px",
      padding: "20px",
      background: "#ecfdf5",
    },
    img: {
      marginTop: "14px",
      width: "100%",
      maxHeight: "200px",
      objectFit: "cover",
      borderRadius: "12px",
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