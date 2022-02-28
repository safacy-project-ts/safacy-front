import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../common/constants/COLORS';
import { stopPublic } from '../store/safacySlice';

const PublicSettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  const { publicMode } = useSelector((state) => state.safacy);

  const toggleSwitch = () => {
    dispatch(stopPublic(id));
    navigation.navigate('Private');
  };

  return (
    <View style={styles.container}>
      <Text>Public Mode</Text>
      <MaterialIcons name="lock-open" size={24} color={COLORS.LIGHT_BLUE} />
      <Text>Share my location</Text>
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

export default PublicSettingScreen;

PublicSettingScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
