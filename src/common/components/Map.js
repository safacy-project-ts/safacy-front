import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Switch, Button } from "react-native";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { setCurrentLocation } from "../../store/locationSlice";

const Map = () => {
  const dispatch = useDispatch();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const locationItem = useSelector((state) => state.location);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      await dispatch(
        setCurrentLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      );
    })();
  }, []);

  return (
    location && (
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChange={(region) => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        onRegionChangeComplete={(region) => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
      >
        <Marker
          coordinate={{
            latitude: location?.latitude,
            longitude: location?.longitude,
          }}
          title="this is a marker"
          description="It's me"
        />
      </MapView>
    )
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: 350,
    height: 150,
  },
});

// Map.propTypes = {
//   destination: PropTypes.string.isRequired,
//   setDestination: PropTypes.func.isRequired,
// };
