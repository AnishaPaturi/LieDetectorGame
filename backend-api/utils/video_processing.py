import os
import cv2
import moviepy.editor as mp
from typing import List

def extract_frames(video_path: str, interval: float = 1.0) -> List:
    """
    Extracts frames from the video at every `interval` seconds.
    Returns list of (timestamp, frame) tuples.
    """
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    frames = []
    count = 0
    sec = 0.0

    while cap.isOpened():
        cap.set(cv2.CAP_PROP_POS_MSEC, sec * 1000)
        success, frame = cap.read()
        if not success:
            break
        frames.append((sec, frame))
        sec += interval
        count += 1
    cap.release()
    return frames

def convert_video_to_audio(video_path: str, output_audio_path: str) -> str:
    """
    Converts a video file to audio and saves it as a .wav file.
    Returns the path to the saved audio file.
    """
    clip = mp.VideoFileClip(video_path)
    clip.audio.write_audiofile(output_audio_path, verbose=False, logger=None)
    return output_audio_path

