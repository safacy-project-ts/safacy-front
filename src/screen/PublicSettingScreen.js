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
import TimePicker from '../common/components/TimePicker';
import DropBox from '../common/components/DropBox';
import Timer from '../common/components/Timer';
import COLORS from '../common/constants/COLORS';

const PublicSettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    destination: 'seoul',
    radius: 100,
    time: 30,
    invitedFriendList: ['bootcamp.ocn@gmail.com'],
  });

  const { id } = useSelector((state) => state.auth);
  const { destination, radius, time, invitedFriendList } = inputs;
  const { publicMode } = useSelector((state) => state.user);

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

      <Text>Radius</Text>
      <DropBox />
      <Text>Time</Text>
      {/* <TimePicker /> */}
      {/* <Timer /> */}
      <Text>Friends</Text>

      <Button title="START" onPress={handleCreateSafacy} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default PublicSettingScreen;

PublicSettingScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
