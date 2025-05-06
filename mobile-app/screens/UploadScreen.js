import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { uploadVideo } from '../services/api';

export default function UploadScreen({ navigation }) {
  const [file, setFile] = useState(null);

  const pickVideo = async () => {
    const res = await DocumentPicker.getDocumentAsync({ type: 'video/*' });
    if (res.assets) {
      setFile(res.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const response = await uploadVideo(file);
    navigation.navigate('Results', { result: response });
  };

  return (
    <View style={styles.container}>
      <Button title="Pick a Video" onPress={pickVideo} />
      {file && <Text style={{ marginVertical: 10 }}>{file.name}</Text>}
      <Button title="Upload & Analyze" onPress={handleUpload} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 }
});
