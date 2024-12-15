import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome from react-native-vector-icons

const Profile = () => {
  // Function to handle the click on the phone number
  const handlePhoneClick = () => {
    Linking.openURL('https://wa.me/6281391042231'); // Replace with your actual WhatsApp number
  };

  // Function to handle the click on the Instagram account
  const handleInstagramClick = () => {
    Linking.openURL('https://instagram.com/veronica.tia_'); // Replace with your Instagram URL
  };

  // Function to handle the click on the LinkedIn account
  const handleLinkedInClick = () => {
    Linking.openURL('https://linkedin.com/in/veronicatian'); // Replace with your LinkedIn URL
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image 
        source={{ uri: 'https://gamaforce.wg.ugm.ac.id/wp-content/uploads/sites/724/2024/05/Veronica-Sistem-Informasi-Geografis-2022.png' }} // Replace with your image URL or local image path
        style={styles.profileImage}
      />

      {/* Name and Identity */}
      <Text style={styles.name}>Veronica Tia Ningrum</Text>
      <Text style={styles.identity}>Student | Geographic Information Systems</Text>

      <Text style={styles.contactLabel}>Connect with me:</Text>

      {/* Instagram */}
      <TouchableOpacity onPress={handleInstagramClick}>
        <View style={styles.iconContainer}>
          <Icon name="instagram" size={30} color="#E4405F" style={styles.icon} />
          <Text style={styles.link}>Instagram</Text>
        </View>
      </TouchableOpacity>

      {/* LinkedIn */}
      <TouchableOpacity onPress={handleLinkedInClick}>
        <View style={styles.iconContainer}>
          <Icon name="linkedin" size={30} color="#0077B5" style={styles.icon} />
          <Text style={styles.link}>LinkedIn</Text>
        </View>
      </TouchableOpacity>

      {/* WhatsApp */}
      <TouchableOpacity onPress={handlePhoneClick}>
        <View style={styles.iconContainer}>
          <Icon name="whatsapp" size={30} color="#25D366" style={styles.icon} />
          <Text style={styles.link}>WhatsApp</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Light gray background color
  },
  profileImage: {
    width: 120, // Width of the profile image
    height: 120, // Height of the profile image
    borderRadius: 60, // To make the image circular
    marginBottom: 20, // Space between image and text
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  identity: {
    fontSize: 16,
    marginBottom: 20,
    color: 'gray',
  },
  contactLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10, // Space between logo and text
  },
  link: {
    fontSize: 16,
    color: '#0066CC',
  },
});

export default Profile;
