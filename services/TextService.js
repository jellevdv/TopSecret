import axios from 'axios';
import * as FileSystem from 'expo-file-system'; // Assuming you're using Expo for mobile development

export const TextService = async (soundFile) => {
  try {
    console.log('soundFile', soundFile);

    // Get the file URI from the soundFile object
    const fileURI = soundFile.status.uri;
    console.log('fileuri',fileURI);

    // Read the file contents
    const fileInfo = await FileSystem.getInfoAsync(fileURI);
    const fileContent = await FileSystem.readAsStringAsync(fileURI, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Create FormData and append the file
    const formData = new FormData();
    formData.append('file', {
      uri: fileURI,
      type: fileInfo.mimeType,
      name: 'recording.mp3',
      data: fileContent,
    });
    console.log('formdata', formData);
    // Send FormData to the API
    const response = await axios.post('http://team3-poc.my-clay.com/api/command?type=elevator', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('API Response:', response.data);

    return response.data; 
  } catch (error) {
    console.error('Error sending data to API:', error.message);
    throw error;
  }
};
