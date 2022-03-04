import React, { useState, useEffect } from "react";
import { View } from "react-native";
import SelectBox from "react-native-multi-selectbox";
import { size, xorBy } from "lodash";

import PropTypes from "prop-types";

import FriendList from "./FriendList";
import TIME from "../constants/TIME";
import RADIUS from "../constants/RADIUS";
import COLORS from "../constants/COLORS";

const PublicSelection = ({ setRadius, setTime }) => {
  const [selectedTime, setSelectedTime] = useState({});
  const [selectedRadius, setSelectedRadius] = useState({});

  const onChangeRadius = (radius) => {
    return setSelectedRadius(radius);
  };

  const onChangeTime = (time) => {
    return setSelectedTime(time);
  };

  useEffect(() => {
    setRadius(selectedRadius.id);
    setTime(selectedTime.id);
  }, [selectedTime, selectedRadius]);

  return (
    <View style={{ width: 300, margin: 30 }}>
      <SelectBox
        label="Radius"
        arrowIconColor={COLORS.LIGHT_BLUE}
        labelStyle={size}
        options={RADIUS}
        value={selectedRadius}
        onChange={onChangeRadius}
        hideInputFilter={false}
      />
      <View style={{ height: 20 }} />
      <SelectBox
        label="Time"
        arrowIconColor={COLORS.LIGHT_BLUE}
        options={TIME}
        value={selectedTime}
        onChange={onChangeTime}
        hideInputFilter={false}
      />
      <View style={{ height: 20 }} />
    </View>
  );
};

export default PublicSelection;

PublicSelection.propTypes = {
  setRadius: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
};
