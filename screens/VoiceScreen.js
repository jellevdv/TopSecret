import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Speech from 'expo-speech';

export default function VoiceScreen() {
  useEffect(() => {
    // This will be called when the component mounts
    speakSentence('Door unlocked');
    
    return () => {
      Speech.stop();
    };
  }, []);

  const speakSentence = async (sentence) => {
    await Speech.speak(sentence, { language: 'en' });
  };

  return (
    <View>
      <Text>Voice Screen</Text>
    </View>
  );
}
