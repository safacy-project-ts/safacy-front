import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import COLORS from "../constants/COLORS";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const SafacyBot = () => {
  // 이상행동에 대한 감지를 하면 safacyBot store에 저장하고,
  // 저장한 내용들을 렌더링해주기
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.chat);

  console.log(message);

  const [safacyBotMsg, setSafacyBotMsg] = useState(message);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // registerForPushNotificationsAsync().then((token) =>
    //   setExpoPushToken(token),
    // );
    // notificationListener.current =
    //   Notifications.addNotificationReceivedListener((notification) => {
    //     setNotification(notification);
    //   });
    // responseListener.current =
    //   Notifications.addNotificationResponseReceivedListener((response) => {
    //     console.log(response);
    //   });
    // return () => {
    //   Notifications.removeNotificationSubscription(
    //     notificationListener.current,
    //   );
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };
  }, []);

  return (
    <View style={styles.container}>
      {message?.map((msg, index) => (
        <View key={index}>
          <Text>{msg}</Text>
        </View>
      ))}
      {/* <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification({ message });
        }}
      /> */}
    </View>
  );
};

const schedulePushNotification = async ({ message }) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got Safacy Info! 📬",
      body: { message },
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
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
    width: 350,
    height: 150,
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.GREY,
  },
});
