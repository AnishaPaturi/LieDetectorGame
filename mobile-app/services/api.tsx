import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

// IMPORTANT: Replace with your actual IP address or deployed backend URL
const BASE_URL = 'http://192.168.3.14:8000'; // Make sure both devices are on the same network

type VideoFile = {
  uri: string;
  name: string;
  type: string;
};

const UploadScreen: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const pickVideo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'video/*',
    });

    if (result.type === 'success') {
      const videoFile: VideoFile = {
        uri: result.uri,
        name: result.name,
        type: 'video/mp4',
      };

      uploadVideo(videoFile);
    }
  };

  const uploadVideo = async (file: VideoFile) => {
    setUploading(true);
    const formData = new FormData();

    formData.append('video', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any); // "as any" avoids type errors in FormData

    try {
      const res = await axios.post(`${BASE_URL}/upload-video/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponse(res.data.message || 'Upload successful!');
    } catch (error: any) {
      console.error('Upload failed:', error);
      Alert.alert('Upload Error', error.message || 'Something went wrong');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Uploader</Text>
      <Button title="Pick and Upload Video" onPress={pickVideo} />
      {uploading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
      {response && <Text style={styles.response}>{response}</Text>}
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  response: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});
