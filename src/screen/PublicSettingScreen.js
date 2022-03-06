import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  SafeAreaView,
} from "react-native";

import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";

import { setTimer } from "../store/timerSlice";
import { clearMessage, sendMessage } from "../store/chatSlice";
import { getCurrentSafacy } from "../store/safacySlice";
import { createSafacy, getUserInfo } from "../store/userSlice";

import Map from "../common/components/Map";
import SearchBar from "../common/components/SearchBar";
import CustomButton from "../common/components/CustomButton";
import PublicSelection from "../common/components/PublicSelection";

import FONTS from "../common/constants/FONT";
import COLORS from "../common/constants/COLORS";
import SAFACY_BOT from "../common/constants/SAFACY_BOT";

const PublicSettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [destination, setDestination] = useState("서울");
  const [radius, setRadius] = useState("");
  const [time, setTime] = useState("");
  const [invitedFriendList, setInvitedFriendList] = useState([]);
  const initialTime = time * 60;
  const { id } = useSelector((state) => state.auth);

  const handleCreateSafacy = async () => {
    await dispatch(
      createSafacy({
        id,
        destination,
        radius,
        time,
        invitedFriendList,
      }),
    );

    await dispatch(setTimer({ sec: initialTime }));
    await dispatch(getCurrentSafacy(id));
    await dispatch(getUserInfo(id));
    await dispatch(clearMessage());
    await dispatch(sendMessage({ message: SAFACY_BOT.START }));
    navigation.navigate("Public", { id });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          Public Mode{" "}
          <MaterialIcons name="lock-open" size={24} color={COLORS.LIGHT_BLUE} />
        </Text>
      </View>

      <View style={styles.map}>
        <Map />
      </View>

      <View style={styles.setting}>
        <View style={styles.destination}>
          <Text style={styles.Destinationtext}> Destination</Text>
          <SearchBar
            style={styles.search}
            destination={destination}
            setDestination={setDestination}
          />
        </View>
        <View style={styles.others}>
          <Text style={styles.othersText}> Setting</Text>
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
    </ScrollView>
  );
};

export default PublicSettingScreen;

PublicSettingScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
  },
  title: {
    flex: 0.4,
    alignItems: "center",
  },
  titleText: {
    fontFamily: FONTS.BOLD_FONT,
    fontSize: FONTS.XL,
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
    justifyContent: "flex-start",
    width: "100%",
    height: "50%",
    paddingTop: 10,
    paddingBottom: 5,
  },
  Destinationtext: {
    fontFamily: FONTS.BOLD_FONT,
    fontSize: FONTS.M,
  },
  others: {
    width: "100%",
    height: "50%",
    overflow: "hidden",
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
