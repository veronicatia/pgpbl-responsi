import React from 'react';
import { View, StyleSheet } from 'react-native';
import Createdata from '../../components/Createdata';

const Add = () => {
  return (
    <View style={styles.container}>
      <Createdata />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // This ensures the View takes up the full screen space
  },
});

export default Add;
