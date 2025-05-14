import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pickle
import os

def load_features():
    facial = np.load("data/processed/facial_features.npy", allow_pickle=True)
    audio = np.load("data/processed/audio_features.npy", allow_pickle=True)

    min_len = min(len(facial), len(audio))
    facial = facial[:min_len]
    audio = audio[:min_len]

    combined = np.hstack((facial.reshape(min_len, -1), audio.reshape(min_len, -1)))
    return combined

def train_deception_model():
    X = load_features()
    y = np.load("data/processed/labels.npy")  # Labels must be pre-prepared
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    clf = RandomForestClassifier(n_estimators=100)
    clf.fit(X_train, y_train)
    acc = clf.score(X_test, y_test)
    print(f"Accuracy: {acc * 100:.2f}%")

    os.makedirs("models", exist_ok=True)
    with open("models/deception_model.plk", "wb") as f:
        pickle.dump(clf, f)

if __name__ == "__main__":
    train_deception_model()
