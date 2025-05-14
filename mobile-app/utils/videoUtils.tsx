import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const isVideoFile = (fileName: string): boolean => {
  const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
  const extension = fileName.split('.').pop()?.toLowerCase();
  return videoExtensions.includes(extension ?? '');
};

const getFileSizeInMB = async (fileUri: string): Promise<number | null> => {
  try {
    const info = await FileSystem.getInfoAsync(fileUri);
    return info.size ? parseFloat((info.size / (1024 * 1024)).toFixed(2)) : null;
  } catch (error) {
    console.error('Failed to get file size:', error);
    return null;
  }
};

const validateVideoFile = async (file: { uri: string; name: string }) => {
  if (!isVideoFile(file.name)) {
    return { valid: false, reason: 'Invalid file type. Please upload a video.' };
  }

  const sizeMB = await getFileSizeInMB(file.uri);
  if (sizeMB !== null && sizeMB > 100) {
    return { valid: false, reason: 'File too large. Max 100MB allowed.' };
  }

  return { valid: true };
};

const VideoValidator: React.FC = () => {
  const [validationResult, setValidationResult] = useState<string | null>(null);

  const handlePickVideo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'video/*',
    });

    if (result.type === 'success') {
      const validation = await validateVideoFile({
        uri: result.uri,
        name: result.name,
      });

      if (!validation.valid) {
        Alert.alert('Validation Error', validation.reason);
        setValidationResult(validation.reason);
      } else {
        Alert.alert('Success', 'Video is valid and ready for upload.');
        setValidationResult('Valid video file ✅');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validate Video File</Text>
      <Button title="Pick Video" onPress={handlePickVideo} />
      {validationResult && <Text style={styles.result}>{validationResult}</Text>}
    </View>
  );
};

export default VideoValidator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});
