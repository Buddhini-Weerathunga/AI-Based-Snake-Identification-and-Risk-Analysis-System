from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
import numpy as np
from PIL import Image
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = "snake_classifier_model.keras"

model = load_model(MODEL_PATH)

classes = [
    "cobra",
    "hump_nosed_pit_viper",
    "indian_rock_python",
    "krait",
    "viper"
]

snake_details = {
    "cobra": {
        "displayName": "Cobra",
        "riskLevel": "High Risk",
        "advice": "Keep distance. Do not touch the snake. Seek urgent medical help if bitten."
    },
    "hump_nosed_pit_viper": {
        "displayName": "Hump Nosed Pit Viper",
        "riskLevel": "High Risk",
        "advice": "Venomous snake. Avoid handling and get medical support immediately if bitten."
    },
    "indian_rock_python": {
        "displayName": "Indian Rock Python",
        "riskLevel": "Low Risk",
        "advice": "Non-venomous, but keep distance and contact wildlife rescue."
    },
    "krait": {
        "displayName": "Krait",
        "riskLevel": "High Risk",
        "advice": "Highly venomous snake. Get emergency medical attention if bitten."
    },
    "viper": {
        "displayName": "Viper",
        "riskLevel": "High Risk",
        "advice": "Venomous snake. Stay away and seek medical help if bitten."
    }
}

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Snake Classification API is running"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image file uploaded"}), 400

        file = request.files["image"]

        img = Image.open(file).convert("RGB")
        img = img.resize((224, 224))

        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0)

        # Important for MobileNetV2
        img_array = preprocess_input(img_array)

        prediction = model.predict(img_array)

        predicted_index = int(np.argmax(prediction[0]))
        confidence = float(np.max(prediction[0]) * 100)

        predicted_class = classes[predicted_index]
        details = snake_details[predicted_class]

        print("Prediction values:", prediction[0])
        print("Predicted index:", predicted_index)
        print("Predicted snake:", predicted_class)
        print("Confidence:", confidence)

        return jsonify({
            "snake": predicted_class,
            "displayName": details["displayName"],
            "riskLevel": details["riskLevel"],
            "advice": details["advice"],
            "confidence": round(confidence, 2)
        })

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "Prediction failed", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)