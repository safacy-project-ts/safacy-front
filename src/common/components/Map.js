import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";

import PropTypes from "prop-types";
import axios from "axios";
import { MAPBOX_ACCESS_TOKEN } from "@env";

import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Polyline,
} from "react-native-maps";
import * as Location from "expo-location";

import LoadingScreen from "../../screen/Auth/LoadingScreen";
import COLORS from "../constants/COLORS";
import { setCurrentLocation } from "../../store/locationSlice";

const Map = ({ radius }) => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [desLocation, setDesLocation] = useState([]);

  const { publicMode } = useSelector((state) => state.user);
  const { current } = useSelector((state) => state.location);
  const { userDestination } = useSelector((state) => state.location);

  function direction() {
    axios(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${current[1]},${current[0]};${userDestination[1]},${userDestination[0]}?geometries=geojson&access_token=pk.eyJ1IjoiY2hvaXN5OTYxOSIsImEiOiJjbDBkdTN0eTQwY295M2pueWw0NzFkNTF4In0.3JQT1triQAhL8KmN9U53zQ`,
    )
      .then((res) => {
        const coords = res.data.routes[0].geometry.coordinates.map((item) => {
          return { latitude: item[1], longitude: item[0] };
        });
        setDesLocation(coords);
        console.log("=====", desLocation);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => direction(), [userDestination]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      await dispatch(
        setCurrentLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      );

      const newLoc = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 1000,
        },
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocations([
            ...locations,
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          ]);
        },
        (error) => console.log(error),
      );
    })();
  }, []);

  const originLocation = useSelector((state) => state.location);

  return location ? (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      zoomControlEnabled
      ScrollEnabled
      showsMyLocationButton
      initialRegion={{
        latitude: originLocation.current[0],
        longitude: originLocation.current[1],
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
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
          latitude: originLocation.current[0],
          longitude: originLocation.current[1],
        }}
        title="start point!"
      />
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        title="Here"
      />
      <Marker
        coordinate={{
          latitude: userDestination[0],
          longitude: userDestination[1],
        }}
        title="destination"
      />
      <Circle
        key="1"
        center={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        fillColor={COLORS.YELLOW}
        radius={radius || 150}
        strokeWidth={1}
        strokeColor={COLORS.GREY}
      />
      <Polyline
        coordinates={locations}
        strokeWidth={2}
        strokeColor={COLORS.RED}
      />
      {publicMode && (
        <Polyline
          coordinates={desLocation}
          strokeWidth={3}
          strokeColor={COLORS.LIGHT_BLACK}
        />
      )}
    </MapView>
  ) : (
    <LoadingScreen />
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: 350,
    height: 180,
  },
});

Map.propTypes = {
  // eslint-disable-next-line react/require-default-props
  radius: PropTypes.number,
};
