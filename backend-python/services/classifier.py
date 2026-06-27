import joblib
import numpy as np
import os

MODEL_PATH = os.path.join("models", "deception_model.pkl")

# Load model (can be lazy-loaded later)
try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    print(f"Warning: Failed to load model from {MODEL_PATH} ({e}). Using mock fallback.")
    model = None

def run_deception_classifier(facial, audio):
    timeline = []

    for idx, (f, a) in enumerate(zip(facial, audio)):
        brow_raise = 0.0
        time_val = float(idx) # Default time to index if not specified
        
        # Handle different formats of facial features (dicts, lists, numpy arrays, or scalars)
        if isinstance(f, dict):
            brow_raise = f.get("brow_raise", 0.0)
            time_val = f.get("time", float(idx))
        elif isinstance(f, (list, np.ndarray)):
            if len(f) > 0:
                try:
                    brow_raise = float(f[0])
                except Exception:
                    pass
        elif isinstance(f, (int, float)):
            brow_raise = float(f)

        # Handle different formats of audio features (dicts, lists, numpy arrays, or scalars)
        pitch = 0.0
        if isinstance(a, dict):
            pitch = a.get("pitch", 0.0)
        elif isinstance(a, (list, np.ndarray)):
            if len(a) > 0:
                try:
                    pitch = float(a[0])
                except Exception:
                    pass
        elif isinstance(a, (int, float)):
            pitch = float(a)

        features = [brow_raise, pitch]

        prob = 0.5
        if model:
            try:
                # model expects 2 input features (brow_raise, pitch)
                prob = model.predict_proba([features])[0][1]  # class 1 = "truth"
            except Exception as e:
                # Fallback to heuristic
                prob = 0.5 + 0.01 * (features[0] + (features[1] % 10))
        else:
            # Fallback mock prediction
            prob = 0.5 + 0.01 * (features[0] + (features[1] % 10))

        timeline.append({
            "time": float(time_val),
            "truth_score": float(round(min(max(prob, 0.0), 1.0), 2))
        })

    return timeline
