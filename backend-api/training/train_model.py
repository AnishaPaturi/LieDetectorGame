import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import os

# Ensure models directory exists
MODEL_DIR = os.path.join("models")
os.makedirs(MODEL_DIR, exist_ok=True)

# Step 1: Generate mock data (replace this with real features later)
# Features: [brow_raise, pitch]
X = np.random.rand(1000, 2) * 10  # Random values for facial & audio features
y = np.random.randint(0, 2, size=1000)  # Labels: 0 = lie, 1 = truth

# Step 2: Split into train/test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 3: Train classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 4: Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"✅ Model trained. Accuracy: {accuracy:.2f}")
print(classification_report(y_test, y_pred))

# Step 5: Save model
model_path = os.path.join(MODEL_DIR, "deception_model.pkl")
joblib.dump(model, model_path)
print(f"📦 Model saved to {model_path}")
