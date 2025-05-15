// app/uploading.tsx
import { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { uploadVideoAndGetResult } from '@/utils/api';

export default function UploadingScreen() {
  useEffect(() => {
    const process = async () => {
      const mockVideoUri = 'file://path-to-recorded-video.mp4'; // Replace with actual
      const result = await uploadVideoAndGetResult(mockVideoUri);
      const encoded = encodeURIComponent(JSON.stringify(result));
      router.push(`/results?data=${encoded}`);
    };
    process();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Processing your video...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' } });
