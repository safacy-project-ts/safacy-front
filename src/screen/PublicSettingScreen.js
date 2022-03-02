import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  Text,
  View,
  Switch,
  Button,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { MaterialIcons } from '@expo/vector-icons';

import { createSafacy, getUserInfo } from '../store/userSlice';

import Map from '../common/components/Map';
import SearchBar from '../common/components/SearchBar';
import RadiusSelection from '../common/components/RadiusSelection';
import TimeSelection from '../common/components/TimeSelection';
import Selection from '../common/components/Selection';

import COLORS from '../common/constants/COLORS';

const PublicSettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [destination, setDestination] = useState('seoul');
  const [radius, setRadius] = useState(100);
  const [time, setTime] = useState(30);
  const [invitedFriendList, setInvitedFriendList] = useState([
    'bootcamp.ocn@gmail.com',
  ]);

  const { id } = useSelector((state) => state.auth);

  const handleCreateSafacy = () => {
    dispatch(
      createSafacy({
        id,
        destination,
        radius,
        time,
        invitedFriendList,
      }),
    );
    navigation.navigate('Public', { id });
    dispatch(getUserInfo(id));
  };

  return (
    <View style={styles.container}>
      <Text>Public Mode</Text>
      <MaterialIcons name="lock-open" size={24} color={COLORS.LIGHT_BLUE} />
      <Text>Share my location</Text>

      <Map />
      <Text>Destination</Text>
      <SearchBar style={styles.search} />
      <Selection
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
    alignItems: 'center',
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
