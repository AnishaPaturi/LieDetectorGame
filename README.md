# 🕵️‍♂️ AI-Powered Lie Detector App

This mobile app uses machine learning to analyze facial microexpressions and voice tone to estimate the probability of deception in recorded or live video conversations. Built with **React Native** and powered by a **FastAPI** backend, the app extracts facial features using **OpenFace** or **MediaPipe** and voice characteristics using **OpenAI’s Whisper**. A custom-trained ML model processes these signals to generate a "truth score" over time, which is visualized as an interactive timeline. Users can upload videos or participate in a fun **"Two Truths and a Lie"** game mode with friends. The app combines real-time UX, psychology, and AI to create an engaging and technically rich experience for both casual and experimental use.

---

## 🧰 Tech Stack

### 📱 Frontend (Mobile App using React Native)

- **React Native**: Framework for building the mobile app using JavaScript. Enables a shared codebase for Android and iOS.
- **Expo**: Simplifies React Native development. Handles camera, media, and device APIs with minimal setup.
- **expo-camera**: Captures video input from the user's device camera.
- **expo-av**: Plays recorded audio and video within the app for review or feedback.
- **expo-file-system**: Reads and stores video/audio files locally on the device.
- **react-native-chart-kit** / **Victory Native**: Visualizes deception scores, facial/voice timelines, and other analytics in user-friendly charts.
- **axios**: Sends video and audio data from the app to the backend API for processing.
- **React Navigation**: Manages screens and navigation for different features like Upload, Results, and Game Mode.
- **Firebase Auth (optional)**: Handles user login/signup if you want users to save history or game results.

### 🧠 Backend (API Server using Python)

- **FastAPI**: High-performance web framework for building the backend REST API. Handles video upload, invokes ML models, and returns results.
- **Pydantic**: Validates request/response data structures in FastAPI. Ensures secure and clean communication between frontend and backend.
- **Uvicorn**: ASGI server to run FastAPI efficiently.
- **Celery + Redis (optional)**: Used if you want to handle long video/audio processing asynchronously in the background.

### 🤖 Machine Learning (Deception Analysis)

- **OpenFace** or **MediaPipe**: Extracts facial landmarks and microexpressions (eye movement, blink rate, lip compression) from each video frame.
- **OpenAI Whisper**: Converts speech in the video to text and extracts voice tone features like pitch, hesitation, and speaking rate.
- **Librosa / pyAudioAnalysis**: Analyzes audio for tone features such as pitch variability, speaking speed, and pauses.
- **Scikit-learn / PyTorch**: Trains a machine learning classifier that combines facial and voice features to predict deception probability.
- **Pandas + NumPy**: Used for data processing and feature engineering before feeding into the ML model.
- **Joblib / TorchScript**: Used to save and serve trained models in production for inference.

### 🗃️ Storage & Database

- **Local File Storage** (MVP): Temporarily stores uploaded video/audio files on the backend server for processing.
- **AWS S3** *(optional)*: For storing videos and audio at scale in production.
- **SQLite** (MVP): Simple local database to store session logs, timestamps, and results.
- **PostgreSQL** *(production)*: Robust database for managing users, session history, and scoring data if scaling up.

### 🚀 Deployment & Hosting

- **Docker**: Containerizes the backend and ML models to make deployment easy and consistent.
- **Render / Railway / Fly.io**: Hosts the FastAPI backend + model server online with automatic deployments. Great for MVPs.
- **Vercel / Expo Go / EAS**: Deploys the React Native frontend or runs it on devices using Expo Go or compiles it into production builds.

### 🎮 Optional Stretch Tools

- **OBS + WebRTC**: If you want to analyze live webcam feeds later on (stretch goal).
- **Auth0 / Firebase**: Manage authentication if users need accounts.
- **LangChain + LLMs** *(future)*: Could be added to analyze what was said and flag suspicious or contradictory speech semantically.
![Uploading image.png…]()
