import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { stopPublic } from '../store/safacySlice';

const PublicScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  const { publicMode } = useSelector((state) => state.safacy);

  const toggleSwitch = () => {
    dispatch(stopPublic(id));
    navigation.navigate('Main');
  };
  return (
    <View style={styles.container}>
      <Text>Public page</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={publicMode ? '#fafafc' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={publicMode}
      />
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
};
