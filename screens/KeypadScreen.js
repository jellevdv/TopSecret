// NumericKeypad.js

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const KeyPadScreen = ({ onKeyPress }) => {
  const handleKeyPress = (key) => {
    onKeyPress(key);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {Array.from({ length: 3 }).map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleKeyPress(index + 1)}
          >
            <Text style={styles.buttonText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {Array.from({ length: 3 }).map((_, index) => (
          <TouchableOpacity
            key={index + 3}
            style={styles.button}
            onPress={() => handleKeyPress(index + 4)}
          >
            <Text style={styles.buttonText}>{index + 4}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {Array.from({ length: 3 }).map((_, index) => (
          <TouchableOpacity
            key={index + 6}
            style={styles.button}
            onPress={() => handleKeyPress(index + 7)}
          >
            <Text style={styles.buttonText}>{index + 7}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleKeyPress('*')}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleKeyPress(0)}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleKeyPress('#')}>
          <Text style={styles.buttonText}>#</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
  },
});

export default KeyPadScreen;
