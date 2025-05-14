import axios from 'axios';

// IMPORTANT: Replace with your actual IP address or deployed backend URL
const BASE_URL = 'http://192.168.3.14:8000'; // e.g., 'http://192.168.1.5:8000'

// Define a type for the video file
type VideoFile = {
  uri: string;
  name: string;
};

export const uploadVideo = async (file: VideoFile) => {
  const formData = new FormData();
  formData.append('video', {
    uri: file.uri,
    name: file.name,
    type: 'video/mp4',
  });

  try {
    const res = await axios.post(`${BASE_URL}/upload-video/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};
