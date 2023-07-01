import React from "react";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import {StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";

function getRandomLatitude(min = 48, max = 56) {
  return Math.random() * (max - min) + min;
}

function getRandomLongitude(min = 14, max = 24) {
  return Math.random() * (max - min) + min;
}

const INITIAL_REGION = {
  latitude: 52.5,
  longitude: 19.2,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5
};

const App = () => {
  const _generateMarkers = count => {
    const markers = [];

    for (let i = 0; i < count; i++) {
      markers.push(
        <Marker
          key={i}
          coordinate={{
            latitude: getRandomLatitude(),
            longitude: getRandomLongitude()
          }}
        />
      );
    }

    return markers;
  };

  return (
    <MapView initialRegion={INITIAL_REGION} style={{ flex: 1 }}>
      {_generateMarkers(200)}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
