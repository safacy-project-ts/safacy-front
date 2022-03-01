import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Switch, Button } from 'react-native';
import { getUserInfo, stopPublic } from '../store/userSlice';
import { getCurrentSafacy } from '../store/safacySlice';

const PublicScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { id } = route.params;

  useEffect(() => {
    dispatch(getUserInfo(id));
    dispatch(getCurrentSafacy(id));
  }, []);

  const { publicMode } = useSelector((state) => state.user);
  const { id: safacyId } = useSelector((state) => state.safacy);

  const toggleSwitch = () => {
    dispatch(stopPublic({ id, safacyId }));
    dispatch(getUserInfo(id));
    navigation.navigate('Main');
  };

  const handleMoveToMain = () => {
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
      <Button title="Main page" onPress={handleMoveToMain} />
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
