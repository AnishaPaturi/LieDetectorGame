import os
import numpy as np
from utils.video_processing import convert_video_to_audio

# Lazy import librosa
try:
    import librosa
    HAS_LIBROSA = True
except ImportError:
    HAS_LIBROSA = False

def analyze_audio(video_path: str, interval: float = 1.0) -> list:
    """
    Extracts audio features (pitch) from video.
    If librosa and moviepy are available, it extracts real pitch.
    Otherwise, it falls back to a simulated feature timeline.
    """
    # Replace common video extensions with .wav for temporary audio extraction
    audio_path = video_path
    for ext in [".mp4", ".mov", ".avi", ".MP4", ".MOV", ".AVI"]:
        if audio_path.endswith(ext):
            audio_path = audio_path[:-len(ext)] + ".wav"
            break
    else:
        audio_path = audio_path + ".wav"

    features = []

    if HAS_LIBROSA:
        try:
            # Convert video to audio
            convert_video_to_audio(video_path, audio_path)
            
            y, sr = librosa.load(audio_path, sr=None)
            duration = librosa.get_duration(y=y, sr=sr)
            
            num_intervals = max(1, int(duration / interval))
            
            for i in range(num_intervals):
                start_sec = i * interval
                end_sec = min((i + 1) * interval, duration)
                start_sample = int(start_sec * sr)
                end_sample = int(end_sec * sr)
                
                chunk = y[start_sample:end_sample]
                pitch = 0.0
                if len(chunk) > 0:
                    try:
                        # Try estimating pitch using YIN
                        f0 = librosa.yin(y=chunk, sr=sr, fmin=80, fmax=400)
                        valid_f0 = f0[~np.isnan(f0)]
                        if len(valid_f0) > 0:
                            pitch = float(np.mean(valid_f0))
                    except Exception:
                        # Fallback to spectral centroid
                        try:
                            centroid = librosa.feature.spectral_centroid(y=chunk, sr=sr)
                            pitch = float(np.mean(centroid))
                        except Exception:
                            pass
                
                features.append({
                    "pitch": pitch
                })
            
            # Clean up generated audio file
            if os.path.exists(audio_path):
                os.remove(audio_path)
                
            return features
        except Exception as e:
            print(f"Error during audio feature extraction: {e}. Falling back to simulation.")
            if os.path.exists(audio_path):
                try:
                    os.remove(audio_path)
                except Exception:
                    pass

    # Fallback simulation
    print("Using simulation fallback for audio analysis.")
    duration = 10.0
    try:
        import cv2
        cap = cv2.VideoCapture(video_path)
        if cap.isOpened():
            fps = cap.get(cv2.CAP_PROP_FPS)
            frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)
            if fps > 0:
                duration = frame_count / fps
            cap.release()
    except Exception:
        pass

    num_intervals = max(1, int(duration / interval))
    for i in range(num_intervals):
        # Simulate pitch between 100Hz and 300Hz
        pitch = float(180.0 + 30.0 * np.cos(i * 0.7) + 10.0 * np.random.randn())
        features.append({
            "pitch": max(50.0, pitch)
        })
        
    return features
