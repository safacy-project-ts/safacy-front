/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { getDistance, getPreciseDistance } from "geolib";
import PropTypes from "prop-types";

import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Polyline,
} from "react-native-maps";
import * as Location from "expo-location";
import mapBoxAPI from "../../api/mapBox";
import { getUserInfo } from "../../store/userSlice";

import LoadingScreen from "../../screen/Auth/LoadingScreen";
import COLORS from "../constants/COLORS";
import { setCurrentLocation } from "../../store/locationSlice";
import { socket } from "../../api/socket";

const calculateDistance = (
  currentLat,
  currentLng,
  destinationLat,
  destinationLng,
) => {
  const distance = getDistance(
    { latitude: currentLat, longitude: currentLng },
    { latitude: destinationLat, longitude: destinationLng },
  );
  return distance;
};

const Map = ({ radius, setDistance, id }) => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [desLocation, setDesLocation] = useState([]);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(async () => {
    if (currentUser !== email) {
      setIsPublic(true);
    }
  }, []);

  const { email: currentUser } = useSelector((state) => state.auth);

  const { email, publicMode } = useSelector((state) => state.user);

  const { current, userDestination } = useSelector((state) => state.location);

  useEffect(() => {
    if (isPublic || publicMode) {
      mapBoxAPI(
        current[1],
        current[0],
        userDestination[1],
        userDestination[0],
        setDesLocation,
      );
    }
  }, [isPublic]);

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
          socket.emit("position", {
            data: position,
          });

          socket.on("myposition", (positionData) => {
            setLocation({
              latitude: positionData.coords.latitude,
              longitude: positionData.coords.longitude,
            });
          });

          if (userDestination[0] && typeof setDistance === "function") {
            const distance = calculateDistance(
              position.coords.latitude,
              position.coords.longitude,
              userDestination[0],
              userDestination[1],
            );
            setCurrentDistance(distance);
            setDistance(distance);
          }

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

  return location ? (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      zoomControlEnabled
      ScrollEnabled
      showsMyLocationButton
      initialRegion={{
        latitude: current[0],
        longitude: current[1],
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
          latitude: current[0],
          longitude: current[1],
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
      {userDestination[0] && (
        <Marker
          coordinate={{
            latitude: userDestination[0],
            longitude: userDestination[1],
          }}
          title="destination"
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
  setDistance: PropTypes.func,
  radius: PropTypes.number,
  id: PropTypes.string,
};
