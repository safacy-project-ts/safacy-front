import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Switch, Button } from 'react-native';

import Map from '../common/components/Map';
import Timer from '../common/components/Timer';
import SafacyBot from '../common/components/SafacyBot';
import COLORS from '../common/constants/COLORS';

import { getUserInfo, stopPublic } from '../store/userSlice';
import { getCurrentSafacy } from '../store/safacySlice';

const PublicScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(true);

  const { id } = useSelector((state) => state.auth);
  const { id: parmsId } = route.params;

  const { publicMode } = useSelector((state) => state.user);
  const { remaining } = useSelector((state) => state.timer);
  const currentSafacy = useSelector((state) => state.safacy);
  const safacyId = currentSafacy.id;

  const [destination, setDestination] = useState(currentSafacy.destination);

  useEffect(async () => {
    if (id === parmsId) {
      setDisabled(false);
    }

    await dispatch(getCurrentSafacy(parmsId));
    await dispatch(getUserInfo(id));
  }, []);

  const toggleSwitch = async () => {
    await dispatch(
      stopPublic({
        id,
        safacyId,
      }),
    );
    await dispatch(getUserInfo(id));
    navigation.navigate('Main');
  };

  const handleMoveToMain = () => {
    navigation.navigate('Main');
  };

  const handleStopPublic = async () => {
    await dispatch(
      stopPublic({
        id,
        safacyId,
      }),
    );

    await dispatch(getUserInfo(id));
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text>Public page</Text>
      <MaterialIcons name="lock-open" size={24} color={COLORS.LIGHT_BLUE} />
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={publicMode ? '#fafafc' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={publicMode}
        disabled={disabled}
      />
      <Button title="Main page" onPress={handleMoveToMain} />
      <Map />
      <Text>My Friends</Text>
      {currentSafacy.invitedFriendList?.map((friend) => (
        <MaterialCommunityIcons
          name="face"
          size={24}
          color="black"
          key={friend}
        />
      ))}
      <Text>Destination</Text>
      <Text>{destination}</Text>
      <Text>Timer</Text>
      <Timer sec={remaining} />

      <SafacyBot />
      {!disabled ? (
        <View>
          <Button title="STOP" onPress={handleStopPublic} />
        </View>
      ) : (
        <View>
          <Text>Emergency</Text>
          <Button title="SOS" onPress={handleStopPublic} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PublicScreen;

PublicScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
