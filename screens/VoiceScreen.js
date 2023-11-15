import React, { useState, useEffect } from 'react';
import Voice from 'react-native-community/voice';

const VoiceScreen = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = () => {
      setListening(true);
    };

    Voice.onSpeechEnd = () => {
      setListening(false);
    };

    Voice.onSpeechResults = (e) => {
      const speechResult = e.value.join(' ');
      setTranscript(speechResult);

      // Call your API here with the transcript
      // If the API call is successful, you can stop listening
      // Voice.stop();
    };

    return () => {
      // Clean up listeners when component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error(error);
    }
  };

  const resetTranscript = () => {
    setTranscript('');
  };

  return (
    <View>
      <Text>Microphone: {listening ? '🎤' : '🔇'}</Text>
      <Button title="Start" onPress={startListening} />
      <Button title="Stop" onPress={stopListening} />
      <Button title="Reset" onPress={resetTranscript} />
      <Text>{transcript}</Text>
    </View>
  );
};

export default VoiceScreen;
