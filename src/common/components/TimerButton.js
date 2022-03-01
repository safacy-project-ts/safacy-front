import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const TimerButton = ({ iconName, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome name={iconName} size={80} color="white" />
    </TouchableOpacity>
  );
};

export default TimerButton;

TimerButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
