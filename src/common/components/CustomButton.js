import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

const CustomButton = ({ message, disabled, onPress, style }) => {
  const handlePressdbutton = () => {
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={handlePressdbutton}
    >
      <Text style={{ ...styles.loginButton, ...style }}>{message}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  loginButton: {
    textAlign: "center",
  },
});

CustomButton.propTypes = {
  message: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
};

CustomButton.defaultProps = {
  disabled: true,
  style: {},
};
