import librosa
import numpy as np
import os
from utils.video_processing import convert_video_to_audio

def analyze_audio(video_path: str) -> np.ndarray:
    """
    Extract audio features (e.g., MFCCs) from video using librosa.
    Returns a 2D array of features per time step.
    """
    audio_path = video_path.replace(".mp4", ".wav")
    convert_video_to_audio(video_path, audio_path)

    y, sr = librosa.load(audio_path, sr=None)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    mfcc = mfcc.T  # shape: (time_steps, features)

    # Normalize MFCCs
    mfcc = (mfcc - np.mean(mfcc, axis=0)) / (np.std(mfcc, axis=0) + 1e-6)

    return mfcc
