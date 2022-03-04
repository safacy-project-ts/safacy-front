import React, { createRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { TouchableOpacity } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import MainScreen from "../screen/MainScreen";
import PrivateModeScreen from "../screen/PrivateScreen";
import PublicSettingScreen from "../screen/PublicSettingScreen";
import PublicScreen from "../screen/PublicScreen";
import FriendListScreen from "../screen/FriendListScreen";
import ProfileScreen from "../screen/ProfileScreen";
import InvitationScreen from "../screen/InvitationScreen";
import COLORS from "../common/constants/COLORS";

const MainStackNavigator = createStackNavigator();

const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator>
      <MainStackNavigator.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }) => ({
          title: "",
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 15, paddingTop: 10 }}
              onPress={() => navigation.navigate("Profile")}
            >
              <FontAwesome
                name="user-circle-o"
                size={35}
                color={COLORS.BLACK}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#a8c6fa",
            borderBottomColor: COLORS.LIGHT_BLACK,
            borderBottomWidth: 1,
            height: 120,
          },
        })}
      />
      <MainStackNavigator.Screen
        name="Private"
        component={PrivateModeScreen}
        options={({ navigation }) => ({
          title: "",
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 15, paddingTop: 10 }}
              onPress={() => navigation.navigate("Main")}
            >
              <MaterialCommunityIcons name="home" size={36} color="black" />
            </TouchableOpacity>
          ),
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 15, paddingTop: 10 }}
              onPress={() => navigation.navigate("Profile")}
            >
              <FontAwesome
                name="user-circle-o"
                size={35}
                color={COLORS.BLACK}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#a8c6fa",
            borderBottomColor: COLORS.LIGHT_BLACK,
            borderBottomWidth: 1,
            height: 120,
          },
        })}
      />
      <MainStackNavigator.Screen
        name="PublicSetting"
        component={PublicSettingScreen}
        options={({ navigation }) => ({
          title: "",
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 15, paddingTop: 10 }}
              onPress={() => navigation.navigate("Main")}
            >
              <MaterialCommunityIcons name="home" size={36} color="black" />
            </TouchableOpacity>
          ),
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 15, paddingTop: 10 }}
              onPress={() => navigation.navigate("Profile")}
            >
              <FontAwesome
                name="user-circle-o"
                size={35}
                color={COLORS.BLACK}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#a8c6fa",
            borderBottomColor: COLORS.LIGHT_BLACK,
            borderBottomWidth: 1,
            height: 120,
          },
        })}
      />
      <MainStackNavigator.Screen
        name="Public"
        component={PublicScreen}
        options={({ navigation }) => ({
          title: "",
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 15, paddingTop: 10 }}
              onPress={() => navigation.navigate("Main")}
            >
              <MaterialCommunityIcons name="home" size={36} color="black" />
            </TouchableOpacity>
          ),
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 15, paddingTop: 10 }}
              onPress={() => navigation.navigate("Profile")}
            >
              <FontAwesome
                name="user-circle-o"
                size={35}
                color={COLORS.BLACK}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#a8c6fa",
            borderBottomColor: COLORS.LIGHT_BLACK,
            borderBottomWidth: 1,
            height: 120,
          },
        })}
      />
      <MainStackNavigator.Screen
        name="FriendList"
        component={FriendListScreen}
        options={({ navigation }) => ({
          title: "",
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 15, paddingTop: 10 }}
              onPress={() => navigation.navigate("Main")}
            >
              <MaterialCommunityIcons name="home" size={36} color="black" />
            </TouchableOpacity>
          ),
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 15, paddingTop: 10 }}
              onPress={() => navigation.navigate("Profile")}
            >
              <FontAwesome
                name="user-circle-o"
                size={35}
                color={COLORS.BLACK}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#a8c6fa",
            borderBottomColor: COLORS.LIGHT_BLACK,
            borderBottomWidth: 1,
            height: 120,
          },
        })}
      />
      <MainStackNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "",
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 15, paddingTop: 10 }}
              onPress={() => navigation.navigate("Main")}
            >
              <MaterialCommunityIcons name="home" size={36} color="black" />
            </TouchableOpacity>
          ),
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 15, paddingTop: 10 }}
              onPress={() => navigation.navigate("Invitation")}
            >
              <MaterialCommunityIcons
                name="bell-circle"
                size={39}
                color="black"
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#a8c6fa",
            borderBottomColor: COLORS.LIGHT_BLACK,
            borderBottomWidth: 1,
            height: 120,
          },
        })}
      />
      <MainStackNavigator.Screen
        name="Invitation"
        component={InvitationScreen}
      />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
