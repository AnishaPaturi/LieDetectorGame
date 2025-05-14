import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types'; // Adjust path if needed

// Define the type for the route prop based on your RootStackParamList
type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

type Props = {
  route: ResultsScreenRouteProp;
};

export default function ResultsScreen({ route }: Props): JSX.Element {
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
      <Text style={styles.summary}>
        Final Verdict: <Text style={{ fontWeight: 'bold' }}>{result?.final_result || 'N/A'}</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  entry: { marginBottom: 10, borderBottomWidth: 1, paddingBottom: 5 },
  summary: { marginTop: 20, fontSize: 16 },
});
