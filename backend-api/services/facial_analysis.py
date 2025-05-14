import cv2
import mediapipe as mp
import numpy as np
from utils.video_processing import extract_frames

mp_face_mesh = mp.solutions.face_mesh

def analyze_facial(video_path: str, interval: float = 1.0) -> np.ndarray:
    """
    Extracts facial landmarks using MediaPipe at every interval.
    Returns a 2D array of flattened landmark coordinates per frame.
    """
    frames = extract_frames(video_path, interval=interval)
    features = []

    with mp_face_mesh.FaceMesh(static_image_mode=True) as face_mesh:
        for timestamp, frame in frames:
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            result = face_mesh.process(rgb_frame)

            if result.multi_face_landmarks:
                face = result.multi_face_landmarks[0]
                landmarks = [(lm.x, lm.y, lm.z) for lm in face.landmark]
                flat = np.array(landmarks).flatten()
                features.append(flat)

    return np.array(features)
