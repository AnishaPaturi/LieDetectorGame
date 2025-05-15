// utils/api.ts
import axios from 'axios';

export async function uploadVideoAndGetResult(videoUri: string) {
  const formData = new FormData();
  formData.append('video', {
    uri: videoUri,
    name: 'video.mp4',
    type: 'video/mp4',
  } as any);

  const response = await axios.post('https://your-api.com/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data; // should return { scoreTimeline, finalScore }
}
