import * as FileSystem from 'expo-file-system';

export const isVideoFile = (fileName) => {
  const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
  const extension = fileName.split('.').pop().toLowerCase();
  return videoExtensions.includes(extension);
};

export const getFileSizeInMB = async (fileUri) => {
  try {
    const info = await FileSystem.getInfoAsync(fileUri);
    return (info.size / (1024 * 1024)).toFixed(2); // MB
  } catch (error) {
    console.error("Failed to get file size:", error);
    return null;
  }
};

export const validateVideoFile = async (file) => {
  if (!isVideoFile(file.name)) {
    return { valid: false, reason: 'Invalid file type. Please upload a video.' };
  }

  const sizeMB = await getFileSizeInMB(file.uri);
  if (sizeMB && sizeMB > 100) {
    return { valid: false, reason: 'File too large. Max 100MB allowed.' };
  }

  return { valid: true };
};
