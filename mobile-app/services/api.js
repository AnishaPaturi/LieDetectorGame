import axios from 'axios';

const BASE_URL = 'http://YOUR_LOCAL_IP:8000'; // replace with actual IP or server

export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append('video', {
    uri: file.uri,
    name: file.name,
    type: 'video/mp4',
  });

  const res = await axios.post(`${BASE_URL}/upload-video/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
};
