import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Switch, Image } from "react-native";

import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";

import FONT from "../common/constants/FONT";
import COLORS from "../common/constants/COLORS";
import { RootState } from "../store";

const PrivateScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { id } = useSelector((state: RootState) => state.auth);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    if (!isEnabled) {
      navigation.navigate("PublicSetting", { id });
    } else {
      navigation.navigate("Main");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        {!isEnabled ? (
          <View>
            <Text style={styles.titleText}>
              Private Mode{" "}
              <MaterialIcons
                style={styles.titleIcon}
                name="lock"
                size={30}
                color={COLORS.PINK}
              />
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.titleText}>
              Public Mode{" "}
              <MaterialIcons
                style={styles.titleIcon}
                name="lock-open"
                size={24}
                color={COLORS.LIGHT_BLUE}
              />
            </Text>
          </View>
        )}
      </View>
      <View style={styles.location}>
        <Text style={styles.locationText}>Share my Location </Text>
        <Switch
          style={styles.locationSwitch}
          trackColor={{
            true: COLORS.SWITCH_TRACK_TRUE,
            false: COLORS.SWITCH_TRACK_FALSE,
          }}
          thumbColor={
            isEnabled ? COLORS.SWITCH_THUMB_TRUE : COLORS.SWITCH_THUMB_FALSE
          }
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.status}>
        {!isEnabled ? (
          <View>
            <Image source="../../assets/img/privacy.png" />
          </View>
        ) : (
          <View>
            <Image source="../../assets/img/public.png" />
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
    alignItems: "center",
    width: 300,
    borderBottomColor: COLORS.GREY,
    borderBottomWidth: 1,
  },
  location: {
    flex: 1,
    alignItems: "center",
  },
  status: {
    flex: 4,
    justifyContent: "flex-start",
    paddingTop: 70,
    alignItems: "center",
  },
  titleText: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.XL,
    color: COLORS.BLACK,
    paddingTop: 50,
  },
  locationText: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.M,
    paddingTop: 20,
    paddingBottom: 10,
  },
});

export default PrivateScreen;

PrivateScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
