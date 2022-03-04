import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import PropTypes from "prop-types";

import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { getCurrentSafacy } from "../store/safacySlice";
import { createSafacy, getUserInfo } from "../store/userSlice";
import { setTimer } from "../store/timerSlice";

import CustomButton from "../common/components/CustomButton";
import Map from "../common/components/Map";
import SearchBar from "../common/components/SearchBar";
import PublicSelection from "../common/components/PublicSelection";

import { sendMessage } from "../store/chatSlice";
import SAFACY_BOT from "../common/constants/SAFACY_BOT";

import LoadingScreen from "./Auth/LoadingScreen";
import FONTS from "../common/constants/FONT";
import COLORS from "../common/constants/COLORS";
import MultiplePublicSelection from "../common/components/MultiplePublicSelection";

const PublicSettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [destination, setDestination] = useState("서울");
  const [radius, setRadius] = useState("");
  const [time, setTime] = useState("");
  const [invitedFriendList, setInvitedFriendList] = useState([]);
  const initialTime = time * 60;
  const { id } = useSelector((state) => state.auth);
  const timer = useSelector((state) => state.timer);
  const { current } = useSelector((state) => state.location);

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
          <Text style={styles.text}>Destination</Text>
          <SearchBar
            style={styles.search}
            destination={destination}
            setDestination={setDestination}
          />
        </View>
        <View style={styles.others}>
          <Text style={styles.text}>Setting</Text>
          <PublicSelection setRadius={setRadius} setTime={setTime} />
        </View>
      </View>
      <View style={styles.friendSelection}>
        <MultiplePublicSelection setInvitedFriendList={setInvitedFriendList} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
  },
  title: {
    flex: 0.8,
    alignItems: "center",
  },
  titleText: {
    fontFamily: FONTS.BOLD_FONT,
    fontSize: FONTS.XL,
    color: COLORS.BLACK,
    paddingTop: 20,
  },
  map: {
    flex: 1.5,
    alignItems: "center",
  },
  destination: {
    justifyContent: "flex-start",
    width: "50%",
    height: 200,
  },
  setting: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  startBtn: {
    width: 150,
    height: 50,
    lineHeight: 40,
    backgroundColor: COLORS.BLUE,
  },
  others: {
    width: "50%",
    height: 300,
    overflow: "hidden",
  },
  friendSelection: { flex: 2, overflow: "visible" },
});

export default PublicSettingScreen;

PublicSettingScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
