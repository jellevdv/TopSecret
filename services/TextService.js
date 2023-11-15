import axios from 'axios';

const TextService = async (apiUrl, type, stringToSend) => {
  try {
    const response = await axios.post(apiUrl, { type: type, data: stringToSend }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('API Response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error sending data to API:', error.message);
    throw error;
  }
};

export default TextService;
