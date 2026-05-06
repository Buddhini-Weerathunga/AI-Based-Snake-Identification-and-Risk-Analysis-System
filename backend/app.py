from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)

# Load model
model = load_model("best_snake_classifier_model.keras")

# Your snake classes
classes = [
    "Cobra",
    "Russell Viper",
    "Krait",
    "Python",
    "Hump Nosed Viper",
    "Green Pit Viper"
]

@app.route("/predict", methods=["POST"])
def predict():

    file = request.files["image"]

    img = Image.open(file).convert("RGB")
    img = img.resize((224, 224))

    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0

    prediction = model.predict(img_array)

    predicted_class = np.argmax(prediction)
    confidence = float(np.max(prediction))

    result = {
        "snake": classes[predicted_class],
        "confidence": round(confidence * 100, 2)
    }

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)