import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Switch, Button } from "react-native";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import PropTypes from "prop-types";

import { sendMessage } from "../store/chatSlice";
import { getCurrentSafacy } from "../store/safacySlice";
import { clearDestination } from "../store/locationSlice";
import { getUserInfo, stopPublic } from "../store/userSlice";

import Map from "../common/components/Map";
import FONT from "../common/constants/FONT";
import COLORS from "../common/constants/COLORS";
import Timer from "../common/components/Timer";
import SAFACY_BOT from "../common/constants/SAFACY_BOT";
import SafacyBot from "../common/components/SafacyBot";
import CustomButton from "../common/components/CustomButton";

const PublicScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [isMine, setIsMine] = useState(true);
  const [isStopped, setIsStopped] = useState(false);
  const [distance, setDistance] = useState(0);

  const { id } = useSelector((state) => state.auth);
  const { id: parmsId } = route.params;

  const { remaining } = useSelector((state) => state.timer);
  const { publicMode } = useSelector((state) => state.user);
  const currentSafacy = useSelector((state) => state.safacy);
  const { radius, id: safacyId, time } = currentSafacy;

  console.log("퍼블릭모드", publicMode);

  useEffect(async () => {
    if (id === parmsId) {
      setIsMine(false);
    }
    await dispatch(getUserInfo(parmsId));
    await dispatch(getCurrentSafacy(parmsId));
  }, []);

  useEffect(async () => {
    if (isStopped) {
      if (distance > radius) {
        await dispatch(sendMessage({ message: SAFACY_BOT.DANGER_TWO }));
        await dispatch(sendMessage({ message: SAFACY_BOT.END_DANGER }));
      } else {
        await dispatch(sendMessage({ message: SAFACY_BOT.TIMEOVER_SAFE }));
        await dispatch(sendMessage({ message: SAFACY_BOT.END_SAFE }));
      }

      await dispatch(clearDestination());
      await dispatch(
        stopPublic({
          id,
          safacyId,
        }),
      );
      await dispatch(getUserInfo(id));
    }
  }, [isStopped]);

  const toggleSwitch = async () => {
    await dispatch(
      stopPublic({
        id,
        safacyId,
      }),
    );

    if (distance > radius) {
      await dispatch(sendMessage({ message: SAFACY_BOT.DANGER_THREE }));
      await dispatch(sendMessage({ message: SAFACY_BOT.END_DANGER }));
    } else {
      await dispatch(sendMessage({ message: SAFACY_BOT.STOPBTN_SAFE }));
      await dispatch(sendMessage({ message: SAFACY_BOT.END_SAFE }));
    }

    await dispatch(clearDestination());
    await dispatch(getUserInfo(id));
  };

  const handleStopPublic = async () => {
    await dispatch(
      stopPublic({
        id,
        safacyId,
      }),
    );

    if (distance > radius) {
      await dispatch(sendMessage({ message: SAFACY_BOT.DANGER_THREE }));
      await dispatch(sendMessage({ message: SAFACY_BOT.END_DANGER }));
    } else {
      await dispatch(sendMessage({ message: SAFACY_BOT.STOPBTN_SAFE }));
      await dispatch(sendMessage({ message: SAFACY_BOT.END_SAFE }));
    }

    await dispatch(clearDestination());
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
        <Map radius={radius} setDistance={setDistance} />
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
            <Text>{currentSafacy.destination}</Text>
          </View>
          <View style={styles.radius}>
            <Text style={styles.radiusTitle}>radius</Text>
            <Text>{currentSafacy.radius}</Text>
          </View>
          <View style={styles.timer}>
            {publicMode && (
              <View>
                <Text style={styles.timerTitle}>Timer</Text>
                <Timer sec={remaining} setIsStopped={setIsStopped} />
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
        {!isMine ? (
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
            <Text style={styles.emergency}>Emergency</Text>
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
    backgroundColor: COLORS.WHITE,
  },
  title: {
    flex: 0.8,
    alignItems: "center",
  },
  titleText: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.XL,
    color: COLORS.BLACK,
    paddingTop: 10,
  },
  location: {
    flex: 0.5,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  locationText: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.M,
    paddingBottom: 5,
  },
  map: {
    flex: 2.5,
    alignItems: "center",
  },
  friends: {
    flex: 0.5,
    alignItems: "flex-start",
    flexDirection: "row",
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
    marginLeft: 5,
  },
  destinationTitle: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.M,
    paddingTop: 5,
    paddingBottom: 5,
  },
  radius: {
    marginLeft: 5,
    marginBottom: 20,
  },
  radiusTitle: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.M,
    paddingTop: 5,
    paddingBottom: 5,
  },
  timer: {
    marginLeft: 5,
  },
  timerTitle: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.M,
    paddingTop: 5,
    paddingBottom: 5,
  },
  safacy: {
    width: "50%",
    height: 230,
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
