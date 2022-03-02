import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import PropTypes from 'prop-types';

import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../store/userSlice';

import PRIVACY_LOCK from '../../assets/img/privacy.png';
import PUBLIC_LOCK from '../../assets/img/public.png';
import COLOR from '../common/constants/COLORS';

const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserInfo(id));
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  const handleMySafacy = () => {
    if (user.publicMode) {
      navigation.navigate('Public', { id });
    } else {
      navigation.navigate('Private');
    }
  };

  const handleYourSafacy = () => {
    navigation.navigate('FriendList');
  };

  return (
    <View style={styles.container}>
      <Button title="My Safacy" onPress={handleMySafacy} />
      <Button title="Your Safacy" onPress={handleYourSafacy} />
      {!user?.publicMode ? (
        <View>
          <Image source={PRIVACY_LOCK} />
          <Text>Private Mode</Text>
        </View>
      ) : (
        <View>
          <Image source={PUBLIC_LOCK} />
          <Text>Public Mode</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainScreen;

MainScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
