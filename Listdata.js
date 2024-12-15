import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Button, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';  // Use expo-image-picker
import { WebView } from 'react-native-webview';  // WebView for the map

const DataList = () => {
  const jsonUrl = 'http://192.168.1.9:3000/posts'; // URL for fetching data
  const [dataUser, setDataUser] = useState([]); // Store data
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // For controlling edit mode
  const [editData, setEditData] = useState(null); // Store the item being edited
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Store selected photo

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data function
  const fetchData = () => {
    setIsLoading(true);
    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
        setDataUser(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };

  // Delete data function
  const deleteData = (id) => {
    fetch(`${jsonUrl}/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setDataUser(dataUser.filter(item => item.id !== id));
        } else {
          console.error('Failed to delete data');
        }
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  // Edit data function
  const editDataFunction = (item) => {
    setIsEditing(true);
    setEditData(item); // Set the data to be edited
    setSelectedPhoto(item.photo || null); // If there's an existing photo, set it
  };

  // Save edited data
  const saveData = () => {
    const updatedData = { ...editData, photo: selectedPhoto }; // Include selected photo in the data

    fetch(`${jsonUrl}/${editData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(updatedData => {
        setDataUser(dataUser.map(item => item.id === updatedData.id ? updatedData : item));
        setIsEditing(false);
        setEditData(null); // Reset editData
        setSelectedPhoto(null); // Reset selected photo
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  // Handle selecting a photo using expo-image-picker
  const handleSelectPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedPhoto(result.assets[0].uri); // Store the selected photo URI
    }
  };

  // Cancel edit mode and reset state
  const cancelEdit = () => {
    setIsEditing(false);
    setEditData(null);
    setSelectedPhoto(null);
  };

  // Function to handle location update when map is clicked
  const handleLocationUpdate = (latitude, longitude) => {
    setEditData(prevData => ({
      ...prevData,
      latitude,
      longitude,
    }));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerr}>
        {/* Display selected photo */}
        {selectedPhoto && (
          <Image source={{ uri: selectedPhoto }} style={styles.selectedPhoto} />
        )}
        <Text style={styles.title}>Available to Adopt!</Text>
      </View>


      {/* Edit Form */}
      {isEditing && (
        <ScrollView style={styles.editForm}>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pet Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Pet Name"
              value={editData.pet_name}
              onChangeText={(text) => setEditData({ ...editData, pet_name: text })}
            />
          </View>

          {/* Species Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Species</Text>
            <TextInput
              style={styles.input}
              placeholder="Species"
              value={editData.species}
              onChangeText={(text) => setEditData({ ...editData, species: text })}
            />
          </View>

          {/* Age Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={editData.age}
              onChangeText={(text) => setEditData({ ...editData, age: text })}
            />
          </View>

          {/* Gender Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={editData.gender}
              onChangeText={(text) => setEditData({ ...editData, gender: text })}
            />
          </View>

          {/* Contact Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Contact"
              value={editData.contact}
              onChangeText={(text) => setEditData({ ...editData, contact: text })}
            />
          </View>

          {/* Latitude Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Latitude</Text>
            <TextInput
              style={styles.input}
              placeholder="Latitude"
              value={editData.latitude ? editData.latitude.toString() : ''}
              onChangeText={(text) => setEditData({ ...editData, latitude: parseFloat(text) })}
              keyboardType="numeric"
            />
          </View>

          {/* Longitude Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Longitude</Text>
            <TextInput
              style={styles.input}
              placeholder="Longitude"
              value={editData.longitude ? editData.longitude.toString() : ''}
              onChangeText={(text) => setEditData({ ...editData, longitude: parseFloat(text) })}
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
                        var map = L.map('map').setView([${editData.latitude || -7.7956}, ${editData.longitude || 110.3695}], 11);
                        var marker;
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        }).addTo(map);
                        
                        map.on('click', function(e) {
                          var lat = e.latlng.lat;
                          var lng = e.latlng.lng;
                          if (marker) {
                            marker.setLatLng([lat, lng]);
                          } else {
                            marker = L.marker([lat, lng]).addTo(map);
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
          <TouchableOpacity onPress={handleSelectPhoto} style={styles.button}>
            <Text style={styles.buttonText}>Select New Photo</Text>
          </TouchableOpacity>



          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.button} onPress={cancelEdit}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={saveData}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>


        </ScrollView>
      )}

      {/* List of data */}
      {!isEditing && (
        <FlatList
        data={dataUser}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.info}>Pet Name: {item.pet_name}</Text>
              <Text style={styles.info}>Species: {item.species}</Text>
              <Text style={styles.info}>Age: {item.age}</Text>
              <Text style={styles.info}>Gender: {item.gender}</Text>
              <Text style={styles.info}>Contact: {item.contact}</Text>
              {/* <Text style={styles.info}>Location: ({item.latitude}, {item.longitude})</Text> */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => editDataFunction(item)}
                  style={[styles.button, { flex: 1, marginRight: 5 }]}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteData(item.id)}
                  style={[styles.button, { flex: 1, marginLeft: 5 }]}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Image source={{ uri: item.photo }} style={styles.image} />
          </View>
        )}
      />
      
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    marginBottom: 90,
    marginTop: 10,
  },
  containerr: {
    flexDirection: 'row', // Menyusun elemen secara horizontal
    alignItems: 'center', // Menyelaraskan elemen secara vertikal
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginLeft: 10,
  },
  editForm: {
    marginTop: 20,
  },
  form: {
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
    height: 40,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
  },
  mapContainer: {
    height: 250,
    marginVertical: 10,
  },
  selectedPhoto: {
    width: 100,
    height: 100,
    marginVertical: 5,
    marginStart: 10,
  },
  card: {
    padding: 10, // Digabungkan
    backgroundColor: '#FFF',
    borderRadius: 10, // Digabungkan
    marginBottom: 10,
    elevation: 3, // Digabungkan
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, // Digabungkan
    shadowRadius: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14, // Digabungkan
    marginBottom: 5,
  },
  image: {
    width: 100, // Digabungkan
    height: 100, // Digabungkan
    borderRadius: 10, // Digabungkan
    marginLeft: 10, // Digabungkan
    alignSelf: 'center', // Dipertahankan
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default DataList;
