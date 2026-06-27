from fastapi import APIRouter, File, UploadFile, HTTPException
import os
from uuid import uuid4
from utils.logger import setup_logger

router = APIRouter()
logger = setup_logger(__name__)

UPLOAD_DIR = "static"

@router.post("/upload/")
async def upload_video(file: UploadFile = File(...)):
    """
    Upload a video file to the server for analysis.
    Saves the file to the 'static' directory with a UUID prefix.
    """
    try:
        allowed_exts = (".mp4", ".mov", ".avi")
        filename = file.filename.lower()

        if not filename.endswith(allowed_exts):
            logger.warning(f"❌ Rejected unsupported file: {file.filename}")
            raise HTTPException(status_code=400, detail="Unsupported file type. Please upload .mp4, .mov, or .avi")

        # ✅ Ensure upload directory exists
        os.makedirs(UPLOAD_DIR, exist_ok=True)

        # ✅ Save file with unique name
        unique_filename = f"{uuid4()}_{filename}"
        save_path = os.path.join(UPLOAD_DIR, unique_filename)

        file_bytes = await file.read()
        with open(save_path, "wb") as f:
            f.write(file_bytes)

        logger.info(f"✅ File uploaded: {unique_filename} ({len(file_bytes)} bytes)")

        return {
            "message": "Upload successful",
            "file_path": save_path
        }

    except HTTPException as e:
        logger.error(f"⚠️ Upload error: {e.detail}")
        raise e
    except Exception as e:
        logger.error(f"🔥 Unexpected error during upload: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")
