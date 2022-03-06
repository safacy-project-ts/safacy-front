import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Provider, useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

import { setCurrentLocation } from "../store/locationSlice";

import AuthNavigator from "../navigations/AuthNavigator";
import store from "../store/index";
import COLORS from "../common/constants/COLORS";

const fetchFonts = () => {
  return Font.loadAsync({
    "quicksand-regular": require("./assets/fonts/Quicksand-Regular.ttf"),
    "quicksand-bold": require("./assets/fonts/Quicksand-Bold.ttf"),
  });
};

const Appwrapper = () => {
  const dispatch = useDispatch();
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={() => console.log("Error happend while loading font")}
      />
    );
  }

  TaskManager.defineTask("BACKGROUND_LOCATION_TASK", ({ data, error }) => {
    if (error) return alert(error.message);

    const { latitude, longitude } = data.locations[0].coords;

    dispatch(
      setCurrentLocation({
        latitude,
        longitude,
      }),
    );
  });

  useEffect(() => {
    StatusBar.setHidden(true);

    (async () => {
      const traceLocation = await Location.startLocationUpdatesAsync(
        "BACKGROUND_LOCATION_TASK",
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 5000,
          distanceInterval: 0.05,
          deferredUpdatesInterval: 5000,
          deferredUpdatesDistance: 1,
          howsBackgroundLocationIndicator: true,
          foregroundService: {
            notificationTitle: "Hell路 에서",
            notificationBody: "당신의 걸음을 기록하고 있어요 🏃🏻🚶🏻‍🏃",
            notificationColor: COLORS.RED,
          },
        },
      );
    })();

    return async () =>
      // eslint-disable-next-line no-return-await
      await Location.stopLocationUpdatesAsync("BACKGROUND_LOCATION_TASK");
  }, []);

  return (
    <View style={styles.container}>
      <AuthNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: "center",
  },
});

export default Appwrapper;
