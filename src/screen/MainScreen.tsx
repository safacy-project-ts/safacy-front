import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Image, AppState } from "react-native";

import PropTypes from "prop-types";

import { getUserInfo } from "../store/userSlice";

import CustomButton from "../common/components/CustomButton";
import COLORS from "../common/constants/COLORS";
import FONT from "../common/constants/FONT";
import { RootState } from "../store";

const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { id } = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);
  const { id: safacyId } = useSelector((state: RootState) => state.safacy);

  useEffect(() => {
    dispatch(getUserInfo(id));
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
            <Image style={styles.lock} source="../../assets/img/privacy.png" />
          </View>
        ) : (
          <View>
            <Text style={styles.public}>PUBLIC MODE</Text>
            <Image style={styles.lock} source="../../assets/img/public.png" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
  },
  title: {
    flex: 1,
    width: 300,
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GREY,
  },
  titleText: {
    paddingTop: 50,
    fontSize: FONT.XL,
    color: COLORS.BLACK,
    fontFamily: FONT.BOLD_FONT,
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
    marginTop: 30,
    marginBottom: 20,
    overflow: "visible",
  },
  timer: {
    paddingTop: 20,
    fontFamily: FONT.REGULAR_FONT,
  },
  privacy: {
    color: COLORS.RED,
    fontFamily: FONT.BOLD_FONT,
  },
  public: {
    color: COLORS.BLUE,
    fontFamily: FONT.BOLD_FONT,
  },
});

export default MainScreen;

MainScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
