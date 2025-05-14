import os
import cv2
import moviepy.editor as mp
from typing import List, Tuple

def extract_frames(video_path: str, interval: float = 1.0) -> List[Tuple[float, any]]:
    """
    Extracts frames from the video at every `interval` seconds.
    Returns list of (timestamp, frame) tuples.
    """
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video file not found: {video_path}")

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise ValueError(f"Failed to open video file: {video_path}")

    fps = cap.get(cv2.CAP_PROP_FPS)
    if fps == 0:
        cap.release()
        raise ValueError("Video FPS is 0. Possibly a corrupt or unsupported file.")

    frames = []
    sec = 0.0

    try:
        while cap.isOpened():
            cap.set(cv2.CAP_PROP_POS_MSEC, sec * 1000)
            success, frame = cap.read()
            if not success:
                break
            frames.append((sec, frame))
            sec += interval
    finally:
        cap.release()

    return frames

def convert_video_to_audio(video_path: str, output_audio_path: str) -> str:
    """
    Converts a video file to audio and saves it as a .wav file.
    Returns the path to the saved audio file.
    """
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video file not found: {video_path}")

    clip = mp.VideoFileClip(video_path)
    clip.audio.write_audiofile(output_audio_path, verbose=False, logger=None)
    return output_audio_path
