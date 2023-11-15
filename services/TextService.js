import axios from 'axios';
import { Audio } from 'expo-av';

export const TextService = ({ soundFile }) => {
    const sendToApi = async () => {
      try {
        const formData = new FormData();
        formData.append('file', soundFile);

        const response = await axios.post('http://localhost:8080/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('API Response:', response.data);

        // Do something with the API response if needed
      } catch (error) {
        console.error('Error sending data to API:', error.message);
        // Handle the error as needed
      }
    };

    sendToApi();

    // Cleanup logic, unload sound file if it's an Audio.Sound object
    if (soundFile instanceof Audio.Sound) {
      soundFile.unloadAsync();
    }

  // You can return JSX here if you want to render something related to this component
  return null;
};
