import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Home = () => {
  const jsonUrl = 'http://192.168.1.9:3000/posts'; // Your API endpoint
  const [dataUser, setDataUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from the server
  useEffect(() => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data); // Check the data
        setDataUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Set initial region based on the first valid item (from fetched JSON data)
  const firstItem = dataUser.find(item => !isNaN(parseFloat(item.latitude)) && !isNaN(parseFloat(item.longitude)));
  const initialRegion = firstItem ? {
    latitude: parseFloat(firstItem.latitude),
    longitude: parseFloat(firstItem.longitude),
    latitudeDelta: 0.7,
    longitudeDelta: 0.7,
  } : {
    latitude: -7.7956, // Default to Yogyakarta if no valid data
    longitude: 110.3695,
    latitudeDelta: 0.7,
    longitudeDelta: 0.7,
  };

  return (
    <View style={styles.container}>
      {/* Image at the top */}
      <Text style={styles.title}>Welcome</Text>

      <Image 
        source={require('./pethome.jpg')} // Replace with the path to your local image
        style={styles.image}
      />
      <Text style={styles.text}>Still available to adpot:</Text>
<FlatList
        data={dataUser}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              {/* Left side: Text information */}
              <View style={styles.textContainer}>
                <Text style={styles.name}>
                  {item?.pet_name}
                </Text>
                <Text style={styles.info}>Species: {item?.species}</Text>
                <Text style={styles.info}>Gender: {item?.gender}</Text>
                <Text style={styles.info}>Age: {item?.age}</Text>
              </View>

              {/* Right side: Image */}
              <Image 
                source={{ uri: item.photo }} 
                style={styles.petImage} 
              />
            </View>
          </View>
        )}
      />
      <Text style={styles.text}>Adoptable Pet Distribution:</Text>
      {/* MapView displaying markers from the fetched data */}
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {dataUser.map((item) => {
          const lat = parseFloat(item.latitude);
          const lon = parseFloat(item.longitude);

          // Ensure valid coordinates before rendering marker
          if (!isNaN(lat) && !isNaN(lon)) {
            return (
              <Marker
                key={item.id}
                coordinate={{ latitude: lat, longitude: lon }}
                title={`${item.pet_name}`}
                description={`Species: ${item.species}, Gender: ${item.gender}`}
                pinColor="blue" // Optional: set the marker's pin color
              />
            );
          }
          return null; // Skip invalid coordinates
        })}
      </MapView>

      {/* FlatList to render the user data below the map */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    marginBottom: 70
  },
  image: {
    width: '100%', // Full width of the screen
    height: 100,   // Set height for the image
    marginTop: 10,
    marginBottom: 5, // Space between image and title
    borderRadius: 10, // Optional: rounded corners for the image
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  map: {
    width: '100%',
    height: 200, // Reduced map height to make space for the list
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',  // Align text and image side by side
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,  // Take up available space for text
    marginRight: 10,  // Add spacing between text and image
  },
  petImage: {
    width: 100,  // Image width
    height: 100, // Image height
    borderRadius: 10,  // Optional: rounded corners for the image
    backgroundColor: '#ccc',  // Optional: background color if image not available
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 10, 
    marginTop: 10
  }
});

export default Home;
