import os
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier

# Create output folder if it doesn't exist
output_dir = os.path.join("..", "backend-api", "models")
os.makedirs(output_dir, exist_ok=True)

# Mock training data
X = np.array([
    [0.2, 180],
    [0.4, 190],
    [0.6, 210],
    [0.1, 170],
    [0.3, 200],
    [0.5, 230],
])
y = np.array([1, 1, 1, 0, 0, 0])  # 1 = truthful, 0 = lie

# Train the model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X, y)

# Save the model
model_path = os.path.join(output_dir, "deception_model.pkl")
joblib.dump(clf, model_path)

print(f"✅ Model saved to {model_path}")
