import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from '../common/constants/COLORS';

import PRIVACY_LOCK from '../../assets/img/privacy.png';
import PUBLIC_LOCK from '../../assets/img/public.png';

const PrivateModeScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    if (!isEnabled) {
      navigation.navigate('PublicSetting');
    } else {
      navigation.navigate('Main');
    }
  };

  return (
    <View style={styles.container}>
      {!isEnabled ? (
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
        thumbColor={isEnabled ? '#fafafc' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      {!isEnabled ? (
        <View>
          <Image source={PRIVACY_LOCK} />
        </View>
      ) : (
        <View>
          <Image source={PUBLIC_LOCK} />
        </View>
      )}
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
