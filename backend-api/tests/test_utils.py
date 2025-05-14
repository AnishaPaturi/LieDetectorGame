import os
from utils.video_processing import extract_frames, convert_video_to_audio

def test_extract_frames():
    video_path = "static/sample.mp4"
    assert os.path.exists(video_path), "Test video not found"

    frames = extract_frames(video_path, interval=1.0)
    assert isinstance(frames, list)
    assert len(frames) > 0
    assert isinstance(frames[0], tuple)
    assert isinstance(frames[0][0], (int, float)), "Expected timestamp as first element"
    assert hasattr(frames[0][1], "shape"), "Expected image array as second element"

def test_convert_video_to_audio():
    video_path = "static/sample.mp4"
    audio_path = "static/test_audio.wav"
    assert os.path.exists(video_path), "Test video not found"

    result_path = convert_video_to_audio(video_path, audio_path)
    assert os.path.exists(result_path), "Converted audio file not found"

    # Clean up
    os.remove(result_path)
