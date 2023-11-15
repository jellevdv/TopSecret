import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VoiceScreen from './screens/VoiceScreen';
import KeypadScreen from './screens/KeypadScreen';
import FaceScreen from './screens/FaceScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Voice" component={VoiceScreen} />
        <Tab.Screen name="Keypad" component={KeypadScreen} />
        <Tab.Screen name="Face" component={FaceScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
