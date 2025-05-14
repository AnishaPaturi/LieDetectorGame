import librosa
import numpy as np
import sys

def extract_audio_features(audio_path):
    y, sr = librosa.load(audio_path, sr=None)
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    return mfccs.T  # Transpose so rows are time frames

if __name__ == "__main__":
    features = extract_audio_features("sample_audio.wav")
    np.save("data/processed/audio_features.npy", features)
