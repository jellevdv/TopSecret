import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VoiceScreen from './screens/VoiceScreen';
import KeypadScreen from './screens/KeypadScreen';
import FaceScreen from './screens/FaceScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Voice') {
              iconName = focused ? 'ios-recording' : 'ios-recording-outline';
            } else if (route.name === 'Keypad') {
              iconName = focused ? 'ios-keypad' : 'ios-keypad-outline';
            } else if (route.name === 'Face') {
              iconName = focused ? 'ios-happy' : 'ios-happy-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#0088ce',
          inactiveTintColor: '#1e1e1e'
        }}
      >
        <Tab.Screen name="Voice" component={VoiceScreen} />
        <Tab.Screen name="Keypad" component={KeypadScreen} />
        <Tab.Screen name="Face" component={FaceScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
