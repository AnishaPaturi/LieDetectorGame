import os
from fastapi.testclient import TestClient
from app.main import app  # Adjust if needed

client = TestClient(app)

def test_analyze_video_endpoint():
    file_path = "static/sample.mp4"
    assert os.path.exists(file_path), f"Test file not found: {file_path}"

    response = client.get(f"/analyze-video/?file_path={file_path}")
    assert response.status_code == 200

    data = response.json()
    assert "timeline" in data
    assert isinstance(data["timeline"], list)

def test_analyze_video_endpoint_invalid_path():
    response = client.get("/analyze-video/?file_path=static/nonexistent.mp4")
    assert response.status_code in (404, 422)
