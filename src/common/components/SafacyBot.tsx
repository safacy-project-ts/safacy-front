/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

import PropTypes from "prop-types";

import { ScrollView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";

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
  const [safacyMsg, setSafacyMsg] = useState([]);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    socket.on("safacyMsg", (message) => {
      setSafacyMsg((safacyMsg) => {
        if (safacyMsg.includes(message)) {
          return [...safacyMsg];
        }
        return [...safacyMsg, message];
      });
    });
  }, []);

  useEffect(() => {
    schedulePushNotification(safacyMsg[safacyMsg.length - 1]);

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [safacyMsg]);

  return (
    <ScrollView style={styles.container}>
      {safacyMsg?.map((msg, index) => (
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
    trigger: { seconds: 1 },
  });
};

export default SafacyBot;

SafacyBot.propTypes = {
  id: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    padding: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 9,
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.GREY,
  },
  safacyInfo: {
    margin: 2,
    fontSize: FONT.S,
    fontFamily: FONT.REGULAR_FONT,
  },
});
