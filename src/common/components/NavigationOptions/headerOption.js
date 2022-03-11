import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

import COLORS from "../../constants/COLORS";

const MainHeaderOption = ({ navigation }) => ({
  title: "",
  headerRight: () => (
    <TouchableOpacity
      style={{ paddingRight: 15, paddingTop: 10 }}
      onPress={() => navigation.navigate("Profile")}
    >
      <FontAwesome name="user-circle-o" size={35} color={COLORS.BLACK} />
    </TouchableOpacity>
  ),
  headerStyle: styles.optionStyle,
});

const DefaultHeaderOption = ({ navigation }) => ({
  title: "",
  headerLeft: () => (
    <TouchableOpacity
      style={{ paddingLeft: 15, paddingTop: 10 }}
      onPress={() => navigation.navigate("Main")}
    >
      <MaterialCommunityIcons name="home" size={36} color={COLORS.BLACK} />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <TouchableOpacity
      style={{ paddingRight: 15, paddingTop: 10 }}
      onPress={() => navigation.navigate("Profile")}
    >
      <FontAwesome name="user-circle-o" size={35} color={COLORS.BLACK} />
    </TouchableOpacity>
  ),
  headerStyle: styles.optionStyle,
});

const ProfileHeaderOption = ({ navigation }) => ({
  title: "",
  headerLeft: () => (
    <TouchableOpacity
      style={{ paddingLeft: 15, paddingTop: 10 }}
      onPress={() => navigation.navigate("Main")}
    >
      <MaterialCommunityIcons name="home" size={36} color={COLORS.BLACK} />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <TouchableOpacity
      style={{ paddingRight: 15, paddingTop: 10 }}
      onPress={() => navigation.navigate("Invitation")}
    >
      <MaterialCommunityIcons
        name="bell-circle"
        size={39}
        color={COLORS.BLACK}
      />
    </TouchableOpacity>
  ),
  headerStyle: styles.optionStyle,
});

const InvitationHeaderOption = ({ navigation }) => ({
  title: "",
  headerLeft: () => (
    <TouchableOpacity
      style={{ paddingLeft: 15, paddingTop: 10 }}
      onPress={() => navigation.navigate("Profile")}
    >
      <Ionicons name="ios-arrow-back-circle" size={36} color={COLORS.BLACK} />
    </TouchableOpacity>
  ),

  headerStyle: styles.optionStyle,
});

export {
  MainHeaderOption,
  DefaultHeaderOption,
  ProfileHeaderOption,
  InvitationHeaderOption,
};

const styles = StyleSheet.create({
  optionStyle: {
    backgroundColor: "#a8c6fa",
    borderBottomColor: COLORS.LIGHT_BLACK,
    borderBottomWidth: 1,
    height: 120,
  },
});
