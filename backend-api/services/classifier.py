import joblib
import numpy as np
import os

MODEL_PATH = os.path.join("models", "deception_model.pkl")

# Load model (can be lazy-loaded later)
try:
    model = joblib.load(MODEL_PATH)
except Exception:
    model = None  # Fallback for initial mock

def run_deception_classifier(facial, audio):
    timeline = []

    for f, a in zip(facial, audio):
        # Combine features (in reality, align more precisely)
        features = [
            f.get("brow_raise", 0),
            a.get("pitch", 0),
        ]

        if model:
            prob = model.predict_proba([features])[0][1]  # class 1 = "truth"
        else:
            # Fallback mock prediction
            prob = 0.5 + 0.01 * (features[0] + features[1] % 10)

        timeline.append({
            "time": f["time"],
            "truth_score": round(min(max(prob, 0), 1), 2)
        })

    return timeline
