import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import PropTypes from "prop-types";

import { StyleSheet, Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { getCurrentSafacy } from "../store/safacySlice";
import { createSafacy, getUserInfo } from "../store/userSlice";
import { setTimer } from "../store/timerSlice";

import Map from "../common/components/Map";
import SearchBar from "../common/components/SearchBar";
import PublicSelection from "../common/components/PublicSelection";
import { sendMessage } from "../store/chatSlice";
import SAFACY_BOT from "../common/constants/SAFACY_BOT";

import COLORS from "../common/constants/COLORS";

const PublicSettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [destination, setDestination] = useState("seoul");
  const [radius, setRadius] = useState("");
  const [time, setTime] = useState("");
  const [invitedFriendList, setInvitedFriendList] = useState([]);
  const initialTime = time * 60;

  const { id } = useSelector((state) => state.auth);
  const timer = useSelector((state) => state.timer);

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
    <View style={styles.container}>
      <Text>Public Mode</Text>
      <MaterialIcons name="lock-open" size={24} color={COLORS.LIGHT_BLUE} />
      <Text>Share my location</Text>

      <Map />
      <Text>Destination</Text>
      <SearchBar style={styles.search} />
      <PublicSelection
        setRadius={setRadius}
        setTime={setTime}
        setInvitedFriendList={setInvitedFriendList}
      />

      <Button title="START" onPress={handleCreateSafacy} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    alignItems: "center",
  },
  map: {
    width: 350,
    height: 200,
  },
  search: {
    width: 300,
    height: 100,
    flex: 0.5,
  },
  selection: {
    flex: 1,
  },
  radius: {
    zIndex: 1000,
  },
  timer: {
    zIndex: 100,
    width: 200,
    height: 30,
  },
});

export default PublicSettingScreen;

PublicSettingScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
