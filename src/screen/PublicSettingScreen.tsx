import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import PropTypes from "prop-types";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { setTimer } from "../store/timerSlice";
import { getCurrentSafacy } from "../store/safacySlice";
import { createSafacy, getUserInfo } from "../store/userSlice";

import Map from "../common/components/Map";
import SearchBar from "../common/components/SearchBar";
import CustomButton from "../common/components/CustomButton";
import PublicSelection from "../common/components/PublicSelection";

import FONT from "../common/constants/FONT";
import COLORS from "../common/constants/COLORS";
import OTHERS from "../common/constants/OTHERS";
import { RootState } from "../store";

const PublicSettingScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [destination, setDestination] = useState<string>(
    OTHERS.CURRENT_LOCATION,
  );
  const [radius, setRadius] = useState<number>();
  const [time, setTime] = useState<number>();
  const [invitedFriendList, setInvitedFriendList] = useState([]);
  const [userDestination, setUserDestination] = useState([]);

  const initialTime = time * 60;
  const { id } = useSelector((state: RootState) => state.auth);

  const handleCreateSafacy = async () => {
    await dispatch(
      createSafacy({
        id,
        destination,
        radius,
        time,
        invitedFriendList,
        userDestination,
      }),
    );

    await dispatch(setTimer({ sec: initialTime }));
    await dispatch(getCurrentSafacy(id));
    await dispatch(getUserInfo(id));
    navigation.navigate("Public", { id, time, radius });
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          Public setting{" "}
          <MaterialIcons name="lock-open" size={24} color={COLORS.LIGHT_BLUE} />
        </Text>
      </View>

      <View style={styles.map}>
        <Map
          id={id}
          setSosLocation={() => console.log(OTHERS.BEFORE_SETTING)}
          setTotalDistance={() => console.log(OTHERS.BEFORE_SETTING)}
        />
      </View>

      <View style={styles.setting}>
        <View style={styles.destination}>
          <Text style={styles.Destinationtext}>
            <FontAwesome5 name="map-pin" size={14} color={COLORS.BLACK} />{" "}
            Destination
          </Text>
          <View
            style={styles.search}
            destination={destination}
            setDestination={setDestination}
            setUserDestination={setUserDestination}
          />
        </View>
        <View style={styles.others}>
          <Text style={styles.othersText}>
            <Ionicons name="settings-outline" size={14} color={COLORS.BLACK} />{" "}
            Setting
          </Text>
          <PublicSelection
            setRadius={setRadius}
            setTime={setTime}
            setInvitedFriendList={setInvitedFriendList}
          />
        </View>
      </View>

      <View style={styles.button}>
        <CustomButton
          title="START"
          style={styles.startBtn}
          disabled={false}
          onPress={handleCreateSafacy}
        />
      </View>
    </View>
  );
};

export default PublicSettingScreen;

PublicSettingScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 0.4,
    alignItems: "center",
  },
  titleText: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.XL,
    color: COLORS.BLACK,
    paddingTop: 20,
  },
  map: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  setting: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
  },
  destination: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    height: "50%",
    paddingTop: 10,
    paddingBottom: 5,
  },
  search: {
    height: "100%",
  },
  Destinationtext: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.M,
    paddingTop: 5,
    paddingBottom: 5,
  },
  others: {
    width: "100%",
    height: "50%",
    overflow: "hidden",
    borderTopColor: COLORS.LIGHT_BLACK,
  },
  othersText: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.M,
    paddingBottom: 10,
  },
  button: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  startBtn: {
    width: 150,
    height: 50,
    lineHeight: 40,
    backgroundColor: COLORS.BLUE,
  },
});
