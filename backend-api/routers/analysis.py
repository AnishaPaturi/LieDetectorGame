from fastapi import APIRouter, HTTPException, Query
import os
from services.facial_analysis import analyze_facial
from services.audio_analysis import analyze_audio
from services.classifier import run_deception_classifier
from schemas.response import AnalysisResponse

router = APIRouter()

@router.get("/analyze-video/", response_model=AnalysisResponse)
def analyze_existing_video(file_path: str = Query(..., description="Path to video in /static/")):
    """
    Analyze an existing video file located on the server.

    Extracts facial and audio features from the video, runs deception classification,
    and returns a timeline of deception probability scores.
    """
    try:
        # ✅ Check if file exists
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="Video file not found.")

        # ✅ Extract features
        facial_features = analyze_facial(file_path)
        audio_features = analyze_audio(file_path)

        # ✅ Validate feature extraction
        if facial_features is None or audio_features is None:
            raise HTTPException(status_code=500, detail="Failed to extract features from video.")

        # ✅ Run classifier
        timeline = run_deception_classifier(facial_features, audio_features)

        # ✅ Return structured timeline
        return {"timeline": timeline}

    except HTTPException as e:
        raise e
    except Exception as e:
        # ✅ Catch-all error handler
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
