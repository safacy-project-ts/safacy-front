/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Polyline,
} from "react-native-maps";

import PropTypes from "prop-types";
import * as Location from "expo-location";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import mapBoxAPI from "../../api/mapBox";
import { socket } from "../../api/socket";

import {
  getCurrentSafacy,
  updateOriginLocation,
  updateDeslocation,
} from "../../store/safacySlice";
import { setCurrentLocation } from "../../store/locationSlice";
import calculateDistance from "../../utils/distanceController";
import LoadingScreen from "../../screen/Auth/LoadingScreen";
import COLORS from "../constants/COLORS";

const Map = ({ setDistance, id, setSosLocation }) => {
  const dispatch = useDispatch();

  const [isMine, setIsMine] = useState(false);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState([]);

  const { id: userId } = useSelector((state) => state.auth);
  const { publicMode } = useSelector((state) => state.user);
  const { current } = useSelector((state) => state.location);
  const {
    id: safacyId,
    userDestination,
    originLocation,
    desLocation,
    publicMode: safacyPublicMode,
  } = useSelector((state) => state.safacy);

  useEffect(async () => {
    if (publicMode && isMine) {
      await mapBoxAPI(
        originLocation[0] ? originLocation[0].longitude : current[1],
        originLocation[0] ? originLocation[0].latitude : current[0],
        userDestination[0].longitude,
        userDestination[0].latitude,
        setDestinationLocation,
      );
    }
  }, [isMine]);

  useEffect(async () => {
    if (destinationLocation?.length !== 0) {
      await dispatch(
        updateDeslocation({ id: safacyId, deslocation: destinationLocation }),
      );
      await dispatch(getCurrentSafacy(id));
    }
  }, [destinationLocation]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      await dispatch(getCurrentSafacy(id));

      if (id === userId) {
        setIsMine(true);
        await dispatch(
          updateOriginLocation({
            id: safacyId,
            location: coords,
          }),
        );
      } else {
        await dispatch(getCurrentSafacy(id));
      }

      await dispatch(setCurrentLocation(coords));

      const newLocation = await Location.watchPositionAsync(
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
              userDestination[0]?.latitude,
              userDestination[0]?.longitude,
            );
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
      return () => {
        newLocation.remove();
      };
    })();
  }, []);

  useEffect(() => {
    return () => console.log("cleanUp");
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
        latitude:
          originLocation?.length === 1
            ? originLocation[0]?.latitude
            : current[0],
        longitude:
          originLocation?.length === 1
            ? originLocation[0]?.longitude
            : current[1],
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
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
          latitude:
            originLocation?.length === 1
              ? originLocation[0]?.latitude
              : current[0],
          longitude:
            originLocation?.length === 1
              ? originLocation[0]?.longitude
              : current[1],
        }}
        title="start point"
      />
      <Marker
        coordinate={{
          latitude: location?.latitude,
          longitude: location?.longitude,
        }}
        title="Here"
      >
        <FontAwesome name="location-arrow" size={24} color={COLORS.SOS_RED} />
      </Marker>

      <Circle
        key="1"
        center={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        fillColor={COLORS.YELLOW}
        radius={150}
        strokeWidth={1}
        strokeColor={COLORS.GREY}
      />
      <Polyline
        coordinates={locations}
        strokeWidth={2}
        strokeColor={COLORS.RED}
      />
      {safacyPublicMode && (
        <Polyline
          coordinates={desLocation?.length ? desLocation : destinationLocation}
          strokeWidth={3}
          strokeColor={COLORS.LIGHT_BLACK}
        />
      )}

      {safacyPublicMode && userDestination && (
        <Marker
          coordinate={{
            latitude: userDestination[0]?.latitude,
            longitude: userDestination[0]?.longitude,
          }}
          title="destination"
        >
          <Ionicons name="flag" size={40} color={COLORS.RED} />
        </Marker>
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
  setSosLocation: PropTypes.func,
  id: PropTypes.string,
};
