import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { uploadVideo } from '../services/api';
import { validateVideoFile } from '../utils/videoUtils'; // 🧠 new import

// Define the type of file state (you may adjust the type based on your needs)
type FileType = {
  name: string;
  uri: string;
};

type Props = {
  navigation: any; // Adjust this type if using TypeScript with navigation types
};

const UploadScreen: React.FC<Props> = ({ navigation }) => {
  const [file, setFile] = useState<FileType | null>(null);
  const [loading, setLoading] = useState(false);

  const pickVideo = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: 'video/*', copyToCacheDirectory: true });
      if (res.assets && res.assets.length > 0) {
        const selectedFile = res.assets[0];

        // Validate video
        const validation = await validateVideoFile(selectedFile);
        if (!validation.valid) {
          Alert.alert('Invalid Video', validation.reason);
          return;
        }

        setFile(selectedFile);
      }
    } catch (error) {
      Alert.alert('Error picking video', error.message);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      console.log('Uploading file:', file);
      const response = await uploadVideo(file);
      console.log('Upload response:', response);
      setLoading(false);
      navigation.navigate('Results', { result: response });
    } catch (error) {
      setLoading(false);
      console.error('Upload error:', error);
      Alert.alert('Upload failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick a Video" onPress={pickVideo} />
      {file && <Text style={styles.filename}>{file.name}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 10 }} />
      ) : (
        <Button title="Upload & Analyze" onPress={handleUpload} disabled={!file} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  filename: { marginVertical: 10, fontStyle: 'italic' },
});

export default UploadScreen;
