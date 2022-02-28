import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PRIVACY_LOCK from '../../assets/img/privacy.png';
import PUBLIC_LOCK from '../../assets/img/public.png';

import COLOR from '../common/constants/COLORS';

import { getUserSafacy } from '../store/safacySlice';

const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserSafacy(id));
  }, []);
  const safacy = useSelector((state) => state.safacy);

  const handleMySafacy = () => {
    if (safacy.publicMode) {
      navigation.navigate('Public');
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
      {!safacy.publicMode ? (
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
