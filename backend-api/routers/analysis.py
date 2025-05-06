from fastapi import APIRouter, Query
from services.facial_analysis import analyze_facial
from services.audio_analysis import analyze_audio
from services.classifier import run_deception_classifier
from schemas.response import AnalysisResponse  # ✅ import the schema

router = APIRouter()

@router.get("/analyze-video/", response_model=AnalysisResponse)
def analyze_existing_video(file_path: str = Query(..., description="Path to the uploaded video file inside /static/")):
    facial_features = analyze_facial(file_path)
    audio_features = analyze_audio(file_path)
    timeline = run_deception_classifier(facial_features, audio_features)

    return {
        "timeline": timeline
    }
