import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <ImageBackground source={require('@/assets/images/background.png')} style={styles.container}>
      <Text style={styles.title}>🕵️‍♂️ Lie Detector</Text>
      <Text style={styles.subtitle}>Detect truth using AI-powered facial & voice analysis.</Text>
      <Button title="Start Test" onPress={() => router.push('/record')} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 30, fontWeight: 'bold', color: '#fff' },
  subtitle: { marginBottom: 20, color: '#eee' },
});
