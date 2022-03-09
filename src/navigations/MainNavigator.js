import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "../screen/MainScreen";
import PublicScreen from "../screen/PublicScreen";
import ProfileScreen from "../screen/ProfileScreen";
import FriendListScreen from "../screen/FriendListScreen";
import InvitationScreen from "../screen/InvitationScreen";
import PrivateModeScreen from "../screen/PrivateScreen";
import PublicSettingScreen from "../screen/PublicSettingScreen";
import {
  MainHeaderOption,
  DefaultHeaderOption,
  ProfileHeaderOption,
  InvitationHeaderOption,
} from "../common/components/NavigationOptions/headerOption";

const MainStackNavigator = createStackNavigator();

const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator>
      <MainStackNavigator.Screen
        name="Main"
        component={MainScreen}
        options={MainHeaderOption}
      />
      <MainStackNavigator.Screen
        name="Private"
        component={PrivateModeScreen}
        options={DefaultHeaderOption}
      />
      <MainStackNavigator.Screen
        name="PublicSetting"
        component={PublicSettingScreen}
        options={DefaultHeaderOption}
      />
      <MainStackNavigator.Screen
        name="Public"
        component={PublicScreen}
        options={DefaultHeaderOption}
      />
      <MainStackNavigator.Screen
        name="FriendList"
        component={FriendListScreen}
        options={DefaultHeaderOption}
      />
      <MainStackNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={ProfileHeaderOption}
      />
      <MainStackNavigator.Screen
        name="Invitation"
        component={InvitationScreen}
        options={InvitationHeaderOption}
      />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
