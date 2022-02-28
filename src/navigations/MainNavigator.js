import React, { createRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../screen/MainScreen';
import PrivateModeScreen from '../screen/PrivateModeScreen';
import PublicSettingScreen from '../screen/PublicSettingScreen';
import PublicScreen from '../screen/PublicScreen';
import FriendListScreen from '../screen/FriendListScreen';
import ProfileScreen from '../screen/ProfileScreen';
import InvitationScreen from '../screen/InvitationScreen';

const MainStackNavigator = createStackNavigator();

const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator>
      <MainStackNavigator.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerStyle: {
            backgroundColor: '#a8c6fa',
            height: 100,
          },
        }}
      />
      <MainStackNavigator.Screen name="Private" component={PrivateModeScreen} />
      <MainStackNavigator.Screen
        name="PublicSetting"
        component={PublicSettingScreen}
      />
      <MainStackNavigator.Screen name="Public" component={PublicScreen} />
      <MainStackNavigator.Screen
        name="FriendList"
        component={FriendListScreen}
      />
      <MainStackNavigator.Screen name="Profie" component={ProfileScreen} />
      <MainStackNavigator.Screen
        name="Invitation"
        component={InvitationScreen}
      />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
