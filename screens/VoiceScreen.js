import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { TextService }  from '../services/TextService.js';
import * as Speech from 'expo-speech';

export default function VoiceScreen() {
  const [recording, setRecording] = React.useState();
  const [sound, setSound] = React.useState();

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    
    await recording.stopAndUnloadAsync();
    
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
  
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
  
    // Define the destination directory and filename
    const destinationUri = FileSystem.documentDirectory + 'recording.mp3';
  
    try {
      // Move the recorded file to the desired location
      await FileSystem.moveAsync({
        from: uri,
        to: destinationUri,
      });
     
      console.log('Recording saved at', destinationUri);
    } catch (error) {
      console.error('Error moving the recording:', error);
    }

    const soundUri = FileSystem.documentDirectory + 'recording.mp3';
  
    const soundToSend = await Audio.Sound.createAsync({
      uri: soundUri,
    });
    const response = await TextService(soundToSend);
    console.log('response in voiceScreen', response.executingCommand);
    await Speech.speak(response.executingCommand, {
      language: 'en',
    });
  }
  
  async function playSound() {
    console.log('Loading Sound');
  
    // Replace 'your_custom_filename.mp3' with the actual filename you used in stopRecording
    const soundUri = FileSystem.documentDirectory + 'recording.mp3';
  
    const { sound } = await Audio.Sound.createAsync({
      uri: soundUri,
    });
  
    setSound(sound);
  
    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
        <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
