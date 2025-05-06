import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ResultsScreen({ route }) {
  const { result } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Deception Analysis</Text>
      {result?.timeline?.map((entry, index) => (
        <View key={index} style={styles.entry}>
          <Text>Time: {entry.time}s</Text>
          <Text>Truth Score: {entry.truth_score.toFixed(2)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  entry: { marginBottom: 10, borderBottomWidth: 1, paddingBottom: 5 }
});
