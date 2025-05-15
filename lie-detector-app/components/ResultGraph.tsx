// components/ResultGraph.tsx
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#1e2923',
  backgroundGradientTo: '#08130D',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 255, 100, ${opacity})`,
  labelColor: () => '#fff',
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#00ff99',
  },
};

export default function ResultGraph({ data }: { data: number[] }) {
  return (
    <View>
      <Text style={{ color: '#fff', fontSize: 18, marginBottom: 10 }}>Truth Probability Over Time</Text>
      <LineChart
        data={{
          labels: data.map((_, i) => `${i}s`),
          datasets: [{ data }],
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{ borderRadius: 16 }}
      />
    </View>
  );
}
