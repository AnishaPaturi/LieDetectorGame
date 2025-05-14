import cv2
import mediapipe as mp
import numpy as np

def extract_facial_features_from_video(video_path):
    mp_face_mesh = mp.solutions.face_mesh
    cap = cv2.VideoCapture(video_path)
    
    with mp_face_mesh.FaceMesh(static_image_mode=False) as face_mesh:
        facial_features = []

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = face_mesh.process(rgb_frame)

            if results.multi_face_landmarks:
                for face_landmarks in results.multi_face_landmarks:
                    landmarks = []
                    for lm in face_landmarks.landmark:
                        landmarks.append((lm.x, lm.y, lm.z))
                    facial_features.append(landmarks)

        cap.release()

    return np.array(facial_features)

if __name__ == "__main__":
    features = extract_facial_features_from_video("sample_video.mp4")
    np.save("data/processed/facial_features.npy", features)
