import cv2
import numpy as np
from utils.video_processing import extract_frames

# Lazy import MediaPipe
try:
    import mediapipe as mp
    mp_face_mesh = mp.solutions.face_mesh
    HAS_MEDIAPIPE = True
except ImportError:
    HAS_MEDIAPIPE = False

def analyze_facial(video_path: str, interval: float = 1.0) -> list:
    """
    Extracts facial features (brow_raise) from video.
    If MediaPipe is available, it calculates real brow raise using eye-brow distance.
    Otherwise, it falls back to a simulated feature timeline.
    """
    frames = extract_frames(video_path, interval=interval)
    features = []

    if HAS_MEDIAPIPE:
        try:
            with mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1) as face_mesh:
                for timestamp, frame in frames:
                    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                    result = face_mesh.process(rgb_frame)

                    brow_raise = 0.0
                    if result.multi_face_landmarks:
                        face = result.multi_face_landmarks[0]
                        try:
                            # Left eye top (159) to left brow (70)
                            left_dist = face.landmark[159].y - face.landmark[70].y
                            # Right eye top (386) to right brow (282)
                            right_dist = face.landmark[386].y - face.landmark[282].y
                            brow_raise = float((left_dist + right_dist) / 2.0)
                        except Exception:
                            pass
                    
                    features.append({
                        "time": float(timestamp),
                        "brow_raise": brow_raise
                    })
            return features
        except Exception as e:
            print(f"Error during MediaPipe facial analysis: {e}. Falling back to simulation.")

    # Fallback simulation
    print("Using simulation fallback for facial analysis.")
    for timestamp, _ in frames:
        # Simulate brow raise value between 0.05 and 0.25
        brow_raise = float(0.15 + 0.05 * np.sin(timestamp * 0.5) + 0.02 * np.random.randn())
        features.append({
            "time": float(timestamp),
            "brow_raise": max(0.0, brow_raise)
        })
    
    return features
