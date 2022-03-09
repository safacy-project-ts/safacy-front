import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Image, AppState } from "react-native";

import PropTypes from "prop-types";

import { getUserInfo, stopPublic } from "../store/userSlice";

import CustomButton from "../common/components/CustomButton";
import COLORS from "../common/constants/COLORS";
import FONT from "../common/constants/FONT";
import PRIVACY_LOCK from "../../assets/img/privacy.png";
import PUBLIC_LOCK from "../../assets/img/public.png";

const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const { id: safacyId } = useSelector((state) => state.safacy);
  const chat = useSelector((state) => state.chat);

  useEffect(async () => {
    await dispatch(getUserInfo(id));
  }, []);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(async () => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      if (appState.current === "inactive") {
        dispatch(
          stopPublic({
            id,
            safacyId,
          }),
        );
      }
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleMySafacy = () => {
    if (user.publicMode) {
      navigation.navigate("Public", { id });
    } else {
      navigation.navigate("Private");
    }
  };

  const handleYourSafacy = () => {
    navigation.navigate("FriendList");
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Main Page</Text>
      </View>
      <View style={styles.button}>
        <View style={styles.mySafacyBtn}>
          <CustomButton
            title="My Safacy"
            disabled={false}
            style={styles.mySafacy}
            onPress={handleMySafacy}
          />
        </View>
        <View style={styles.yourSafacyBtn}>
          <CustomButton
            title="Your Safacy"
            disabled={false}
            style={styles.yourSafacy}
            onPress={handleYourSafacy}
          />
        </View>
      </View>
      <View style={styles.status}>
        {!user.publicMode ? (
          <View>
            <Text style={styles.privacy}>PRIVACY MODE</Text>
            <Image style={styles.lock} source={PRIVACY_LOCK} />
          </View>
        ) : (
          <View>
            <Text style={styles.public}>PUBLIC MODE</Text>
            <Image style={styles.lock} source={PUBLIC_LOCK} />
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
    alignItems: "center",
  },
  title: {
    flex: 1,
    width: 300,
    borderBottomColor: COLORS.GREY,
    borderBottomWidth: 1,
    alignItems: "center",
    paddingBottom: 15,
  },
  titleText: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.XL,
    color: COLORS.BLACK,
    paddingTop: 50,
  },
  button: {
    flex: 4,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  status: {
    flex: 3,
    alignItems: "center",
  },

  mySafacyBtn: {
    paddingTop: 50,
  },
  yourSafacyBtn: {
    paddingTop: 40,
  },
  mySafacy: {
    height: 90,
    lineHeight: 85,
    fontSize: 22,
    backgroundColor: COLORS.RED,
  },
  yourSafacy: {
    height: 90,
    lineHeight: 85,
    fontSize: 22,
    backgroundColor: COLORS.YELLOW,
  },
  lock: {
    width: 100,
    height: 100,
    overflow: "visible",
    marginTop: 30,
    marginBottom: 20,
  },
  timer: {
    fontFamily: FONT.REGULAR_FONT,
    paddingTop: 20,
  },
  privacy: {
    fontFamily: FONT.BOLD_FONT,
    color: COLORS.RED,
  },
  public: {
    fontFamily: FONT.BOLD_FONT,
    color: COLORS.BLUE,
  },
});

export default MainScreen;

MainScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
