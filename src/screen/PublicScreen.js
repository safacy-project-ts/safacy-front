import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableHighlight,
} from "react-native";
import useInterval from "use-interval";
import * as SMS from "expo-sms";
import dayjs from "dayjs";

import PropTypes from "prop-types";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import Tooltip from "react-native-walkthrough-tooltip";
import { socket } from "../api/socket";

import { updateCount } from "../store/locationSlice";
import { getUserInfo, stopPublic } from "../store/userSlice";
import { getCurrentSafacy, updateSafacyMsg } from "../store/safacySlice";

import Map from "../common/components/Map";
import Timer from "../common/components/Timer";
import SafacyBot from "../common/components/SafacyBot";
import CustomButton from "../common/components/CustomButton";
import sosController from "../utils/sosController";

import FONT from "../common/constants/FONT";
import COLORS from "../common/constants/COLORS";
import SAFACY_BOT from "../common/constants/SAFACY_BOT";

const PublicScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.auth);
  const { id: paramsId, time: setTime } = route.params;

  const [isMine, setIsMine] = useState(true);
  const [distance, setDistance] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [isStopped, setIsStopped] = useState(false);
  const [sosLocation, setSosLocation] = useState([]);

  const [smsServiceAvailable, setSmsServiceAvailable] = useState(false);
  const [toolTipVisible, setToolTipVisible] = useState(false);

  const { count } = useSelector((state) => state.location);
  const { remaining } = useSelector((state) => state.timer);
  const { publicMode } = useSelector((state) => state.user);
  const currentSafacy = useSelector((state) => state.safacy);
  const { radius, id: safacyId } = currentSafacy;

  useEffect(async () => {
    if (id !== paramsId) {
      setIsMine(false);
    }
    await dispatch(getCurrentSafacy(paramsId));

    await dispatch(
      updateSafacyMsg({
        id: safacyId,
        message: dayjs().format("hh:mm A") + SAFACY_BOT.START,
      }),
    );
    socket.emit("safacyBot", SAFACY_BOT.START);
    checkIfServiceAvailable();
  }, []);

  useInterval(async () => {
    if (id === paramsId) {
      dispatch(updateCount());
      const currentDistance =
        totalDistance - (totalDistance * 3 * count) / setTime;

      if (distance + radius <= currentDistance && currentDistance !== 0) {
        socket.emit(
          "safacyBot",
          dayjs().format("hh:mm A") + SAFACY_BOT.MOVING_SAFE,
        );
      } else {
        socket.emit(
          "safacyBot",
          dayjs().format("hh:mm A") + SAFACY_BOT.MOVING_DANGER,
        );
      }
    }
  }, 2 * 60 * 1000);

  useEffect(async () => {
    try {
      if (isStopped) {
        await dispatch(
          stopPublic({
            id,
            safacyId,
          }),
        );

        if (distance > radius) {
          await dispatch(
            updateSafacyMsg({
              id: safacyId,
              message: dayjs().format("hh:mm A") + SAFACY_BOT.DANGER_THREE,
            }),
          );
          socket.emit(
            "safacyBot",
            dayjs().format("hh:mm A") + SAFACY_BOT.DANGER_THREE,
          );
          await dispatch(
            updateSafacyMsg({
              id: safacyId,
              message: dayjs().format("hh:mm A") + SAFACY_BOT.END_DANGER,
            }),
          );
          socket.emit(
            "safacyBot",
            dayjs().format("hh:mm A") + SAFACY_BOT.END_DANGER,
          );
        } else {
          await dispatch(
            updateSafacyMsg({
              id: safacyId,
              message: dayjs().format("hh:mm A") + SAFACY_BOT.STOPBTN_SAFE,
            }),
          );
          socket.emit(
            "safacyBot",
            dayjs().format("hh:mm A") + SAFACY_BOT.STOPBTN_SAFE,
          );
          await dispatch(
            updateSafacyMsg({
              id: safacyId,
              message: dayjs().format("hh:mm A") + SAFACY_BOT.END_SAFE,
            }),
          );
          socket.emit(
            "safacyBot",
            dayjs().format("hh:mm A") + SAFACY_BOT.END_SAFE,
          );
        }
        await dispatch(getCurrentSafacy(id));
        await dispatch(getUserInfo(id));
      }
    } catch (error) {
      setErrorMsg(error);
    }
  }, [isStopped]);

  const toggleSwitch = async () => {
    try {
      await dispatch(
        stopPublic({
          id,
          safacyId,
        }),
      );

      if (distance > radius) {
        await dispatch(
          updateSafacyMsg({
            id: safacyId,
            message: dayjs().format("hh:mm A") + SAFACY_BOT.DANGER_THREE,
          }),
        );
        socket.emit(
          "safacyBot",
          dayjs().format("hh:mm A") + SAFACY_BOT.DANGER_THREE,
        );
        await dispatch(
          updateSafacyMsg({
            id: safacyId,
            message: dayjs().format("hh:mm A") + SAFACY_BOT.END_DANGER,
          }),
        );
        socket.emit(
          "safacyBot",
          dayjs().format("hh:mm A") + SAFACY_BOT.END_DANGER,
        );
      } else {
        await dispatch(
          updateSafacyMsg({
            id: safacyId,
            message: dayjs().format("hh:mm A") + SAFACY_BOT.STOPBTN_SAFE,
          }),
        );
        socket.emit(
          "safacyBot",
          dayjs().format("hh:mm A") + SAFACY_BOT.STOPBTN_SAFE,
        );
        await dispatch(
          updateSafacyMsg({
            id: safacyId,
            message: dayjs().format("hh:mm A") + SAFACY_BOT.END_SAFE,
          }),
        );
        socket.emit(
          "safacyBot",
          dayjs().format("hh:mm A") + SAFACY_BOT.END_SAFE,
        );
      }
      await dispatch(getCurrentSafacy(id));
      await dispatch(getUserInfo(id));
    } catch (error) {
      setErrorMsg(error);
    }
  };

  const handleStopPublic = async () => {
    await dispatch(
      stopPublic({
        id,
        safacyId,
      }),
    );

    if (distance > radius) {
      await dispatch(
        updateSafacyMsg({
          id: safacyId,
          message: dayjs().format("hh:mm A") + SAFACY_BOT.DANGER_THREE,
        }),
      );
      socket.emit(
        "safacyBot",
        dayjs().format("hh:mm A") + SAFACY_BOT.DANGER_THREE,
      );
      await dispatch(
        updateSafacyMsg({
          id: safacyId,
          message: dayjs().format("hh:mm A") + SAFACY_BOT.END_DANGER,
        }),
      );
      socket.emit(
        "safacyBot",
        dayjs().format("hh:mm A") + SAFACY_BOT.END_DANGER,
      );
    } else {
      await dispatch(
        updateSafacyMsg({
          id: safacyId,
          message: dayjs().format("hh:mm A") + SAFACY_BOT.STOPBTN_SAFE,
        }),
      );
      socket.emit(
        "safacyBot",
        dayjs().format("hh:mm A") + SAFACY_BOT.STOPBTN_SAFE,
      );
      await dispatch(
        updateSafacyMsg({
          id: safacyId,
          message: dayjs().format("hh:mm A") + SAFACY_BOT.END_SAFE,
        }),
      );
      socket.emit("safacyBot", dayjs().format("hh:mm A") + SAFACY_BOT.END_SAFE);
    }
    await dispatch(getCurrentSafacy(id));
    await dispatch(getUserInfo(id));
  };

  const checkIfServiceAvailable = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      setSmsServiceAvailable(true);
    }
  };

  const onComposeSms = async () => {
    if (smsServiceAvailable) {
      await SMS.sendSMSAsync(
        "119",
        sosController(sosLocation.latitude, sosLocation.longitude),
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          {isMine ? `Public Page` : `Friend safacy`}{" "}
          <MaterialIcons name="lock-open" size={24} color={COLORS.LIGHT_BLUE} />
        </Text>
      </View>

      <View style={styles.location}>
        {isMine ? (
          <Switch
            trackColor={{
              true: COLORS.SWITCH_TRACK_TRUE,
              false: COLORS.SWITCH_TRACK_FALSE,
            }}
            thumbColor={
              publicMode ? COLORS.SWITCH_THUMB_TRUE : COLORS.SWITCH_THUMB_FALSE
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={publicMode}
            disabled={!publicMode}
          />
        ) : (
          <CustomButton
            title="◀︎ Friend List"
            onPress={() => {
              dispatch(getUserInfo(id));
              navigation.navigate("FriendList");
            }}
            disabled={false}
            style={styles.backBtn}
          />
        )}
      </View>

      <View style={styles.map}>
        <Map
          radius={radius}
          id={paramsId}
          setDistance={setDistance}
          setTotalDistance={setTotalDistance}
          setSosLocation={setSosLocation}
        />
      </View>

      <View style={styles.friends}>
        <View>
          <Text style={styles.friendsTitle}>Who are checking now : </Text>
        </View>
        {currentSafacy.invitedFriendList?.map((friend, index) => (
          <Tooltip
            animated
            backgroundColor="rgba(0,0,0,0.5)"
            arrowSize={{ width: 5, height: 15 }}
            isVisible={toolTipVisible}
            content={<Text>{friend}</Text>}
            placement="top"
            onClose={() => setToolTipVisible(false)}
            contentStyle={{ backgroundColor: COLORS.YELLOW }}
            key={friend}
          >
            <TouchableHighlight
              style={styles.touchable}
              onPress={() => setToolTipVisible(true)}
            >
              <View>
                <MaterialCommunityIcons
                  name="face"
                  size={24}
                  color={COLORS.BLACK}
                />
              </View>
            </TouchableHighlight>
          </Tooltip>
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
            {isMine && publicMode && (
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
            <Ionicons name="md-logo-android" size={17} color={COLORS.BLACK} />
          </Text>
          <SafacyBot id={paramsId} />
        </View>
      </View>

      <View style={styles.button}>
        {isMine ? (
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
            <Text style={styles.sosText}>Emergency</Text>
            <CustomButton
              title="SOS"
              style={styles.sosBtn}
              disabled={false}
              onPress={onComposeSms}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default PublicScreen;

PublicScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      time: PropTypes.number,
      radius: PropTypes.number,
      nickname: PropTypes.string,
    }),
  }).isRequired,
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
  backBtn: {
    width: 150,
    height: 30,
    lineHeight: 35,
    backgroundColor: COLORS.WHITE,
    color: COLORS.LIGHT_BLACK,
    fontSize: FONT.M,
    borderColor: COLORS.WHITE,
    marginBottom: 5,
  },
  stopBtn: {
    width: 150,
    height: 40,
    lineHeight: 35,
    backgroundColor: COLORS.RED,
  },
  sosBtn: {
    width: 200,
    height: 40,
    lineHeight: 35,
    backgroundColor: COLORS.SOS_RED,
  },
  sosText: {
    fontFamily: FONT.BOLD_FONT,
    color: COLORS.SOS_RED,
    paddingBottom: 5,
  },
});
