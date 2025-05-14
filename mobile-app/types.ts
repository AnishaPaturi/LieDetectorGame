// types.ts
export type RootStackParamList = {
  Home: undefined;
  Upload: undefined;
  Results: {
    result: {
      timeline: { time: number; truth_score: number }[];
      final_result: string;
    };
  };
};
