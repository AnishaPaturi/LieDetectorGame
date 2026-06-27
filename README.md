# 🕵️‍♂️ AI-Powered Lie Detector App

[![React Native](https://img.shields.io/badge/React_Native-v0.74+-61DAFB?logo=react&logoColor=black&style=flat-square)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-v51.0+-000000?logo=expo&logoColor=white&style=flat-square)](https://expo.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?logo=fastapi&logoColor=white&style=flat-square)](https://fastapi.tiangolo.com)
[![Express](https://img.shields.io/badge/Express-Node.js-000000?logo=express&logoColor=white&style=flat-square)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white&style=flat-square)](https://www.mongodb.com)

An interactive mobile application that uses machine learning to analyze facial microexpressions (via MediaPipe FaceMesh) and vocal tone variations (via Librosa audio analysis) to estimate the probability of deception in real-time or recorded videos. It features a user authentication flow, live camera recording, deceptive score charts, and a "Two Truths and a Lie" multiplayer game mode.

---

## 📂 Project Directory Structure

```directory
LieDetectorGame/
├── backend-node/         # Express.js REST API (User authentication & database management)
├── backend-python/       # FastAPI ML Inference Server (Facial & Audio feature extraction + classification)
├── frontend-app/         # Expo / React Native Mobile Application Client
├── ml-models/            # Machine Learning training scripts, notebooks, and reference models
└── README.md             # Project documentation and setup guide
```

---

## 🛠️ Tech Stack

- **Frontend Mobile App**: React Native, Expo, Expo Camera, Expo AV, Axios, React Navigation, React Native Chart Kit
- **Node.js Authentication Server**: Express, Mongoose (MongoDB Atlas), JSON Web Token (JWT), Multer, Bcrypt
- **Python ML Inference Server**: FastAPI, Uvicorn, Scikit-learn, Joblib, MediaPipe, Librosa, OpenCV-Python, MoviePy
- **Database**: MongoDB Atlas

---

## 🚀 Getting Started

### 1. Database & Express Server (`backend-node`)
The Express server handles user registration and login, storing credentials securely in MongoDB Atlas.

1. Navigate to the `backend-node` folder:
   ```bash
   cd backend-node
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env` file (update your Mongo URI and set a JWT secret):
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 2. Python ML Inference Server (`backend-python`)
The Python server processes videos, extracts visual/audio characteristics, and runs them through the trained Random Forest classifier.

1. Navigate to the `backend-python` folder:
   ```bash
   cd backend-python
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### 3. Mobile Client (`frontend-app`)
The mobile client enables camera recording, uploading files, seeing analytics dashboards, and playing the game.

1. Navigate to the `frontend-app` folder:
   ```bash
   cd frontend-app
   ```
2. Install client-side dependencies:
   ```bash
   npm install
   ```
3. Launch Expo:
   ```bash
   npx expo start
   ```
4. Open on Android Emulator, iOS Simulator, or scan the QR code using the **Expo Go** app on your physical device.

---

## 🧠 ML Model Pipeline Details
1. **Facial Feature Extraction**: Computes eyebrows-to-eyes ratios (indicating eyebrow raising/tension) using normalized MediaPipe coordinates.
2. **Audio Feature Extraction**: Performs fundamental frequency estimation (pitch tracing) using the YIN algorithm or spectral centroid tracking.
3. **Classification**: Serves a 2-feature Random Forest model to predict truthfulness scores over time.

---

## 🏷️ Tags
`#machine-learning` `#react-native` `#expo` `#fastapi` `#nodejs` `#express` `#mongodb` `#ai` `#computer-vision` `#audio-processing` `#deception-detection` `#lie-detector`
