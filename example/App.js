import {Image, Platform, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import ClusteredMapView from "react-native-map-clustering";
import MapView, {LatLng, Marker, Region} from 'react-native-maps';
import debounce from 'lodash.debounce';

function getRandomLatitude(min = 37.42, max = 37.6) {
  return Math.random() * (max - min) + min;
}

function getRandomLongitude(min = 126.88, max = 127.1) {
  return Math.random() * (max - min) + min;
}

const INITIAL_REGION = {
  latitude: 37.55,
  longitude: 126.98,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

const App = () => {
  const mapRef = useRef(null);
  const markers = [];

  (function(count) {
    for (let i = 0; i < count; i++) {
      markers.push({
        coordinate: {
          latitude: getRandomLatitude(),
          longitude: getRandomLongitude()
        },
      })
    }
  }(1000));

  // const _onMarkerPress = (i) => () => {
  //   mapRef.current?.animateToRegion({...markers[i].coordinate, latitudeDelta: 0.003, longitudeDelta: 0.003});
  // };
  const _onMarkerPress = useCallback((i) => () => {
    mapRef.current?.animateToRegion({...markers[i].coordinate, latitudeDelta: 0.003, longitudeDelta: 0.003});
  }, [markers]);

  return (
    <ClusteredMapView ref={mapRef}
                      initialRegion={INITIAL_REGION}
                      style={styles.map}
                      extent={128}
                      clusterColor="#0c19"
                      minZoomLevel={5}
                      maxZoom={13}
                      minPoints={5}
    >
      {markers.map((m, i) => (
        // <Marker
        //   key={i}
        //   coordinate={m.coordinate}
        //   onPress={_onMarkerPress(i)}
        // />
        <ImageMarker
        key={i}
        coordinate={m.coordinate}
        onPress={_onMarkerPress(i)}
        />
        ))}
    </ClusteredMapView>
  );
};

export default App;

const ImageMarker = ({coordinate, onPress}) => {
  const [shouldTrack, setTrack] = useState(false);
  const [image, setImage] = useState('https://via.placeholder.com/50/0000FF');

  useEffect(() => {
    setTrack(true);
    setImage('https://via.placeholder.com/50');
    // simulate the network call and the state update
    const timeout = setTimeout(() => {
      setImage('https://via.placeholder.com/50/0000FF');
      setTrack(false);
    }, 600);
    return () => clearInterval(timeout);
  }, [coordinate]);

  // tracksViewChanges should be false when state update is over
  return (
    <Marker tracksViewChanges={shouldTrack} coordinate={coordinate} image={{uri: image}} onPress={onPress} />
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
