

# 🐍 AI-Based Snake Identification and Risk Analysis System

## 📌 Overview

The AI-Based Snake Identification and Risk Assessment System is a Deep Learning-powered web application designed to identify Sri Lankan snake species from uploaded images. The system helps users recognize potentially dangerous snakes and provides risk information and safety guidance in multiple languages.

This project combines **Computer Vision**, **Deep Learning**, and **Full Stack Development** to create an accessible platform for public awareness and snakebite prevention.

---

## 🚨 Problem Statement

Sri Lanka is home to several venomous snake species, and many people struggle to correctly identify snakes after encounters or snakebite incidents. Misidentification can lead to panic, delayed medical treatment, and increased health risks.

This system addresses this problem by providing an AI-powered solution that can quickly identify snake species from images and provide relevant safety information.

---

## ✨ Features

* AI-powered snake species identification
* Image upload and classification
* Real-time prediction results
* Confidence score display
* Snake risk assessment
* First-aid guidance
* Responsive web interface
* REST API integration
* Multilingual Support:

  * 🇱🇰 Sinhala
  * 🇱🇰 Tamil
  * 🇬🇧 English

---

## 🐍 Supported Snake Species

* Cobra (Naja naja)
* Krait (Bungarus caeruleus)
* Russell's Viper (Daboia russelii)
* Hump-Nosed Pit Viper (Hypnale hypnale)
* Indian Rock Python (Python molurus)

---

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* Axios
* React Router
* i18next

### Backend

* Python
* Flask
* Flask-CORS

### Artificial Intelligence

* TensorFlow
* Keras
* MobileNetV2
* NumPy
* Pillow (PIL)

---

## 🏗️ System Architecture

```text
User
  │
  ▼
React Frontend
  │
  ▼
Flask REST API
  │
  ▼
TensorFlow MobileNetV2 Model
  │
  ▼
Prediction Result
```

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Buddhini-Weerathunga/AI-Based-Snake-Identification-and-Risk-Analysis-System.git

cd AI-Based-Snake-Identification-and-Risk-Analysis-System
```

---

## Backend Setup

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Flask API

```bash
python app.py
```

Server will run on:

```text
http://127.0.0.1:5000
```

---

## Frontend Setup

Navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run application:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---


## Future Enhancements

* Additional Sri Lankan snake species
* Mobile application version
* GPS-based snake region mapping
* Emergency contact integration
* Improved dataset and model accuracy
* Offline prediction support



