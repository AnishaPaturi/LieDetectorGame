from fastapi import APIRouter, UploadFile, File
import shutil
from services.facial_analysis import analyze_facial
from services.audio_analysis import analyze_audio
from services.classifier import run_deception_classifier

router = APIRouter()

@router.post("/upload-video/")
async def upload_video(video: UploadFile = File(...)):
    video_path = f"static/{video.filename}"
    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)

    facial_features = analyze_facial(video_path)
    audio_features = analyze_audio(video_path)
    
    timeline = run_deception_classifier(facial_features, audio_features)

    return { "timeline": timeline }
