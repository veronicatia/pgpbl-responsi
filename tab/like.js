import { View, Text, StyleSheet } from 'react-native';  // Added StyleSheet import
import React from 'react';
import Listdata from '../../components/Listdata';

function likes() {
    return (
        <View style={styles.container}>
            <Listdata />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // This ensures the View takes up the full screen space
  },
});

export default likes;
