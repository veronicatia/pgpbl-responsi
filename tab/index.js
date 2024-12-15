// HomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';  // Make sure to import StyleSheet
import Home from '../../Home';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // This ensures the View takes up the full screen space
  },
});
