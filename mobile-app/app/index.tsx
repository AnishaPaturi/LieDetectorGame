import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen imports
import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';
import ResultsScreen from '../screens/ResultsScreen';

// Define the types for navigation stack
export type RootStackParamList = {
  Home: undefined;
  Upload: undefined;
  Results: { result: any }; // Replace `any` with a proper type if you have one
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
