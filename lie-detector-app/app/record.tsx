import { useState, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { router } from 'expo-router';

export default function RecordScreen() {
  const [recording, setRecording] = useState(false);
  const cameraRef = useRef(null);

  const startRecording = async () => {
    if (cameraRef.current) {
      setRecording(true);
      const video = await cameraRef.current.recordAsync();
      // Optionally store the video URI globally or via context
      router.push('/uploading');
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      <Button title={recording ? 'Recording...' : 'Start Recording'} onPress={startRecording} disabled={recording} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
});
