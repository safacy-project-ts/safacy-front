import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Switch, Button } from "react-native";

import CustomButton from "../common/components/CustomButton";
import Map from "../common/components/Map";
import Timer from "../common/components/Timer";
import SafacyBot from "../common/components/SafacyBot";
import SAFACY_BOT from "../common/constants/SAFACY_BOT";
import COLORS from "../common/constants/COLORS";
import FONT from "../common/constants/FONT";

import { getUserInfo, stopPublic } from "../store/userSlice";
import { getCurrentSafacy } from "../store/safacySlice";
import { sendMessage } from "../store/chatSlice";

const PublicScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(true);

  const { id } = useSelector((state) => state.auth);
  const { id: parmsId } = route.params;

  const { publicMode } = useSelector((state) => state.user);
  const { remaining } = useSelector((state) => state.timer);
  const currentSafacy = useSelector((state) => state.safacy);
  const safacyId = currentSafacy.id;

  const [destination, setDestination] = useState(currentSafacy.destination);

  useEffect(async () => {
    if (id === parmsId) {
      setDisabled(false);
    }

    await dispatch(getCurrentSafacy(parmsId));
    await dispatch(getUserInfo(id));
  }, []);

  const toggleSwitch = async () => {
    await dispatch(
      stopPublic({
        id,
        safacyId,
      }),
    );

    await dispatch(sendMessage({ message: SAFACY_BOT.STOPBTN_SAFE }));
    await dispatch(sendMessage({ message: SAFACY_BOT.END_SAFE }));
    await dispatch(getUserInfo(id));
  };

  const handleStopPublic = async () => {
    await dispatch(
      stopPublic({
        id,
        safacyId,
      }),
    );

    await dispatch(sendMessage({ message: SAFACY_BOT.END_SAFE }));
    await dispatch(getUserInfo(id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          Public page{" "}
          <MaterialIcons name="lock-open" size={24} color={COLORS.LIGHT_BLUE} />
        </Text>
      </View>
      <View style={styles.location}>
        <Text style={styles.locationText}>Share my Location</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={publicMode ? "#fafafc" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={publicMode}
          disabled={!publicMode}
        />
      </View>
      <View style={styles.map}>
        <Map />
      </View>
      <View style={styles.friends}>
        <View>
          <Text style={styles.friendsTitle}>Who are checking now : </Text>
        </View>
        {currentSafacy.invitedFriendList?.map((friend, index) => (
          <View key={friend}>
            <MaterialCommunityIcons
              name="face"
              size={24}
              color="black"
              onPress={() =>
                console.log(currentSafacy.invitedFriendList[index])
              }
            />
          </View>
        ))}
      </View>
      <View style={styles.information}>
        <View style={styles.detail}>
          <View style={styles.destination}>
            <Text style={styles.destinationTitle}>Destination</Text>
            <Text>{destination}</Text>
          </View>
          <View style={styles.radius}>
            <Text style={styles.radiusTitle}>radius</Text>
            <Text>{currentSafacy.radius}</Text>
          </View>
          <View style={styles.timer}>
            {publicMode && (
              <View>
                <Text style={styles.timerTitle}>Timer</Text>
                <Timer sec={remaining} />
              </View>
            )}
          </View>
        </View>
        <View style={styles.safacy}>
          <Text style={styles.safacyTitle}>
            Safacy Bot{" "}
            <Ionicons name="md-logo-android" size={17} color="black" />
          </Text>
          <SafacyBot />
        </View>
      </View>
      <View style={styles.button}>
        {!disabled ? (
          <View>
            <CustomButton
              title="STOP"
              style={styles.stopBtn}
              onPress={handleStopPublic}
              disabled={!publicMode}
            />
          </View>
        ) : (
          <View>
            <Text>Emergency</Text>
            <CustomButton
              title="SOS"
              style={styles.sosBtn}
              disabled={false}
              onPress={handleStopPublic}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.XL,
    color: COLORS.BLACK,
    paddingTop: 10,
  },
  location: {
    flex: 1,
    alignItems: "center",
  },
  locationText: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.M,
    paddingBottom: 5,
  },
  map: {
    flex: 2,
    alignItems: "center",
  },
  friends: {
    flex: 0.5,
    alignItems: "flex-start",
    flexDirection: "row",
    // justifyContent: "center",
    marginLeft: 25,
    marginTop: 30,
    marginRight: 20,
    paddingLeft: 10,
    paddingTop: 10,
    borderRadius: 10,
    borderColor: COLORS.LIGHT_BLACK,
    borderBottomWidth: 1,
  },
  friendsTitle: {
    fontFamily: FONT.BOLD_FONT,
  },
  information: {
    flex: 4,
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 10,
  },
  detail: {
    width: "50%",

    paddingLeft: 20,
  },
  destination: {
    marginBottom: 20,
  },
  destinationTitle: {
    fontFamily: FONT.BOLD_FONT,
    paddingTop: 5,
    paddingBottom: 5,
  },
  radius: {},
  radiusTitle: {
    fontFamily: FONT.BOLD_FONT,
    paddingTop: 5,
    paddingBottom: 5,
  },
  timer: {},
  timerTitle: {
    fontFamily: FONT.BOLD_FONT,
    paddingTop: 5,
    paddingBottom: 5,
  },
  safacy: {
    width: "50%",
  },
  safacyTitle: {
    fontFamily: FONT.BOLD_FONT,
    paddingBottom: 5,
  },
  button: {
    flex: 1.5,
    alignItems: "center",
  },
  stopBtn: {
    width: 150,
    height: 40,
    lineHeight: 35,
    backgroundColor: COLORS.RED,
  },
  sosBtn: {
    backgroundColor: COLORS.SOS_RED,
  },
});

export default PublicScreen;

PublicScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
