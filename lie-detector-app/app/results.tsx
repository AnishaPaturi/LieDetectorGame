// app/results.tsx
import { View, Text, Button, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import ResultGraph from '@/components/ResultGraph';

export default function ResultsScreen() {
  const { data } = useLocalSearchParams();
  const parsed = data ? JSON.parse(decodeURIComponent(data as string)) : null;

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Truth Score: {parsed?.finalScore}%</Text>
      <ResultGraph data={parsed?.scoreTimeline || []} />
      <Button title="Try Again" onPress={() => router.push('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  score: { fontSize: 24, marginBottom: 16 },
});
