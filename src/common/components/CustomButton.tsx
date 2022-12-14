import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";

import PropTypes from "prop-types";

import FONT from "../constants/FONT";
import COLORS from "../constants/COLORS";

const CustomButton = ({ title, disabled, onPress, style }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} disabled={disabled} onPress={onPress}>
      <Text style={{ ...styles.loginButton, ...style }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
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

const styles = StyleSheet.create({
  loginButton: {
    width: 300,
    height: 50,
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.LIGHT_BLACK,
    fontSize: FONT.L,
    fontFamily: FONT.BOLD_FONT,
    lineHeight: 40,
    textAlign: "center",
    color: COLORS.WHITE,
    backgroundColor: COLORS.RED,
  },
});
