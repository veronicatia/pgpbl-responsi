import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview'; // Import WebView
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

const Createdata = () => {
  const jsonUrl = 'http://192.168.1.9:3000/posts';
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [photo, setPhoto] = useState(null); // Photo state to store the selected image URI
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const submit = () => {
    const data = {
      pet_name: petName,
      species: species,
      age: age,
      gender: gender,
      contact: contact,
      photo: photo,  // Assuming the photo is a URI
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    fetch(jsonUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert('Data saved successfully');
        setPetName('');
        setSpecies('');
        setAge('');
        setGender('');
        setContact('');
        setPhoto(null); // Clear photo after submit
        setLatitude('');
        setLongitude('');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to save data');
      });
  };

  const handleLocationUpdate = (latitude, longitude) => {
    setLatitude(latitude.toString());
    setLongitude(longitude.toString());
  };

  const selectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Image Picker Result:', result);  // Log the result for debugging

    if (!result.canceled) {
      // Convert the image to base64 format
      const base64Image = await fetch(result.assets[0].uri)
        .then((res) => res.blob())
        .then((blob) => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result); // base64 string here
          reader.onerror = reject;
          reader.readAsDataURL(blob); // Convert the blob into base64
        }));

      console.log('Base64 Image:', base64Image);  // Log the base64 image for debugging

      setPhoto(base64Image); // Store the base64 string in state
    } else {
      console.log('User cancelled photo selection');  // Log if the user cancels
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Add Pet Description</Text>
        <ScrollView style={styles.form}>
          {/* Pet Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pet Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Pet Name"
              value={petName}
              onChangeText={(value) => setPetName(value)}
            />
          </View>

          {/* Species Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Species</Text>
            <TextInput
              style={styles.input}
              placeholder="Species"
              value={species}
              onChangeText={(value) => setSpecies(value)}
            />
          </View>

          {/* Age Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={age}
              onChangeText={(value) => setAge(value)}
              keyboardType="numeric"
            />
          </View>

          {/* Gender Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={gender}
              onChangeText={(value) => setGender(value)}
            />
          </View>

          {/* Contact Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Contact"
              value={contact}
              onChangeText={(value) => setContact(value)}
            />
          </View>

           {/* Latitude Input */}
  <View style={styles.inputContainer}>
    <Text style={styles.label}>Latitude</Text>
    <TextInput
      style={styles.input}
      placeholder="Latitude"
      value={latitude}
      onChangeText={(value) => setLatitude(value)}
      keyboardType="numeric"
    />
  </View>

  {/* Longitude Input */}
  <View style={styles.inputContainer}>
    <Text style={styles.label}>Longitude</Text>
    <TextInput
      style={styles.input}
      placeholder="Longitude"
      value={longitude}
      onChangeText={(value) => setLongitude(value)}
      keyboardType="numeric"
    />
  </View>

          {/* WebView with Leaflet Map */}
          <View style={styles.mapContainer}>
            <WebView
              originWhitelist={['*']}
              source={{
                html: `
                  <html>
                    <head>
                      <title>Leaflet Map</title>
                      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
                      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
                      <style>
                        #map { height: 100%; width: 100%; }
                      </style>
                    </head>
                    <body>
                      <div id="map"></div>
                      <script>
                        var map = L.map('map').setView([-7.7956, 110.3695], 11); // Default coordinates
                        var marker; // Variable to store the marker
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        }).addTo(map);
                        
                        map.on('click', function(e) {
                          var lat = e.latlng.lat;
                          var lng = e.latlng.lng;
                          if (marker) {
                            marker.setLatLng([lat, lng]); // Update marker position if it already exists
                          } else {
                            marker = L.marker([lat, lng]).addTo(map); // Add a new marker
                          }
                          window.ReactNativeWebView.postMessage(JSON.stringify({ latitude: lat, longitude: lng }));
                        });
                      </script>
                    </body>
                  </html>`
              }}
              onMessage={(event) => {
                const { latitude, longitude } = JSON.parse(event.nativeEvent.data);
                handleLocationUpdate(latitude, longitude); // Update location when map is clicked
              }}
            />
          </View>
 {/* Select Photo Button */}
 <TouchableOpacity style={styles.imageButton} onPress={selectPhoto}>
            <Text style={styles.imageButtonText}>Select Photo</Text>
          </TouchableOpacity>

          {photo && (
            <Image
              source={{ uri: photo }} // Use the URI of the selected image
              style={styles.imagePreview}
            />
          )}
          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={styles.buttonText}>Save Description</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Createdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 15,
    paddingVertical: 25,
    marginBottom: 100
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  title: {
    paddingVertical: 10,
    backgroundColor: '#FF6347',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 8,
  },
  form: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    flex: 2,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 14,
    color: '#333',
  },
  imageButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 10
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 5,
    borderRadius: 8,
    marginBottom: 10
  },
  mapContainer: {
    height: 230,
    marginVertical: 5,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
