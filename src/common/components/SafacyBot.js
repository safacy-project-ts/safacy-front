/* eslint-disable react/require-default-props */
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Button, Platform } from "react-native";

import PropTypes from "prop-types";

import { ScrollView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { getSafacyMsg, updateSafacyMsg } from "../../store/chatSlice";
import { getCurrentSafacy } from "../../store/safacySlice";
import { socket } from "../../api/socket";
import COLORS from "../constants/COLORS";
import FONT from "../constants/FONT";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const SafacyBot = ({ id }) => {
  const dispatch = useDispatch();

  const safacy = useSelector((state) => state.safacy);
  const { email } = useSelector((state) => state.auth);

  // useEffect(async () => {
  //   await dispatch(getCurrentSafacy(id));
  // }, []);

  // setInterval(async () => {
  //   await dispatch(getCurrentSafacy(id));
  // }, 5000);

  const { message } = useSelector((state) => state.chat);

  const [safacyBotMsg, setSafacyBotMsg] = useState(safacy.safacyBotMsg);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(async () => {
    socket.emit("safacyBot", {
      data: message,
    });

    socket.on("safacyMsg", (message) => {
      setSafacyBotMsg(message);
    });

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token),
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    await schedulePushNotification(message[message.length - 1]);

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [message]);

  return (
    <ScrollView style={styles.container}>
      {safacy.safacyBotMsg?.map((msg, index) => (
        <View key={index}>
          <Text style={styles.safacyInfo}>{msg}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const schedulePushNotification = async (message) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got Safacy Info!",
      body: message,
      data: { data: "goes here" },
    },
    to: [],
    trigger: { seconds: 1 },
  });
};

const registerForPushNotificationsAsync = async () => {
  let token;

  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "ios") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

export default SafacyBot;

const styles = StyleSheet.create({
  container: {
    width: 180,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.GREY,
    borderRadius: 9,
    padding: 5,
    overflow: "hidden",
  },
  safacyInfo: {
    margin: 2,
    fontFamily: FONT.REGULAR_FONT,
    fontSize: FONT.S,
  },
});

SafacyBot.propTypes = {
  id: PropTypes.string,
};
