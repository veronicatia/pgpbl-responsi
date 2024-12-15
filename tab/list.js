import { View, StyleSheet } from 'react-native';
import React from 'react';
import Profile from '../../Profile'; // Importing Profile component

function ProfileScreen() { // Renamed function to avoid conflict
    return (
        <View style={styles.container}>
            <Profile /> {/* Using the Profile component */}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // This ensures the View takes up the full screen space
  },
});

export default ProfileScreen; // Exporting ProfileScreen instead of Profile
