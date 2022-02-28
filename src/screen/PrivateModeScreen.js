import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../common/constants/COLORS';
import { startPublic } from '../store/safacySlice';

const PrivateModeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  const { publicMode } = useSelector((state) => state.safacy);

  const toggleSwitch = () => {
    if (!publicMode) {
      dispatch(startPublic(id));
      navigation.navigate('PublicSetting');
    }
  };

  return (
    <View style={styles.container}>
      {!publicMode ? (
        <View>
          <Text>Private Mode</Text>
          <MaterialIcons name="lock" size={24} color={COLORS.PINK} />
        </View>
      ) : (
        <View>
          <Text>Public Mode</Text>
          <MaterialIcons name="lock-open" size={24} color={COLORS.LIGHT_BLUE} />
        </View>
      )}

      <Text>Share my Location</Text>
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
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PrivateModeScreen;

PrivateModeScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
