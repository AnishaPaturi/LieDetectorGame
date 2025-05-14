import pandas as pd
from services.classifier import run_deception_classifier

def test_run_deception_classifier_from_csv():
    # Load datasets
    facial_df = pd.read_csv("training/data/facial_features.csv")
    audio_df = pd.read_csv("training/data/audio_features.csv")

    # Drop any non-feature columns like 'label' or 'id'
    facial_features = facial_df.drop(columns=["label", "video_id"], errors="ignore").values.tolist()
    audio_features = audio_df.drop(columns=["label", "audio_id"], errors="ignore").values.tolist()

    # Ensure both datasets have the same length
    assert len(facial_features) == len(audio_features), "Mismatched rows between facial and audio features"

    # Run classifier
    result = run_deception_classifier(facial_features, audio_features)

    # Validate output
    assert isinstance(result, list), "Result should be a list"
    assert len(result) == len(facial_features), "Output length mismatch"

    for entry in result:
        assert isinstance(entry, dict), "Each item should be a dict"
        assert "time" in entry, "'time' key missing"
        assert "truth_score" in entry, "'truth_score' key missing"
        assert 0 <= entry["truth_score"] <= 1, "Truth score out of bounds"
