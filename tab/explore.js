import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import DataListWithMap from '../../components/DataListWithMap';

export default function App() {
  return (
    <View style={styles.container}>
      <DataListWithMap/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
