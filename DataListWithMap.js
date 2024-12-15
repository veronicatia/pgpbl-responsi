import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Image, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DataListWithMap = () => {
  const jsonUrl = 'http://192.168.1.9:3000/posts'; // Your API endpoint
  const [dataUser, setDataUser] = useState([]); // Ensure it's initialized as an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch data from the server
  useEffect(() => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data); // Debugging: Log fetched data
        setDataUser(data); // Set the fetched data
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, []);

  // Handle marker press to show modal
  const handleMarkerPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Open directions in default map app
  const openDirections = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) => console.error('Error opening directions:', err));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* MapView displaying markers from the fetched data */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -7.7956,
          longitude: 110.3695,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {/* Ensure dataUser is an array and map over it safely */}
        {Array.isArray(dataUser) && dataUser.length > 0 && dataUser.map((item) => {
          const lat = parseFloat(item.latitude);
          const lon = parseFloat(item.longitude);

          if (!isNaN(lat) && !isNaN(lon)) {
            return (
              <Marker
                key={`${item.latitude}-${item.longitude}`} // Ensure unique key
                coordinate={{ latitude: lat, longitude: lon }}
                onPress={() => handleMarkerPress(item)} // Handle marker click
              />
            );
          }
          return null;
        })}
      </MapView>

      {/* Modal to show additional details */}
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {`${selectedItem.pet_name} (${selectedItem.species})`}
              </Text>
              <Text>Age: {selectedItem.age}</Text>
              <Text>Gender: {selectedItem.gender}</Text>
              <Text>Contact: {selectedItem.contact}</Text>
              {selectedItem.photo && (
                <Image source={{ uri: selectedItem.photo }} style={styles.image} />
              )}

              {/* Buttons for directions and close */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.directionsButton}
                  onPress={() => openDirections(selectedItem.latitude, selectedItem.longitude)}
                >
                  <Text style={styles.directionsButtonText}>Get Directions</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  directionsButton: {
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  directionsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DataListWithMap;
