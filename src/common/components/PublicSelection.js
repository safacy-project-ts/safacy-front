import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";

import PropTypes from "prop-types";

import TIME from "../constants/TIME";
import FONT from "../constants/FONT";
import RADIUS from "../constants/RADIUS";
import COLORS from "../constants/COLORS";
import FriendList from "./FriendList";

const PublicSelection = ({ setRadius, setTime, setInvitedFriendList }) => {
  const [selectedTime, setSelectedTime] = useState({});
  const [selectedRadius, setSelectedRadius] = useState({});
  const [selectedFriends, setSelectedFriends] = useState([]);

  const onMultiChange = (friend) => {
    return setSelectedFriends(xorBy(selectedFriends, [friend], "id"));
  };

  const onChangeRadius = (radius) => {
    return setSelectedRadius(radius);
  };

  const onChangeTime = (time) => {
    return setSelectedTime(time);
  };

  useEffect(() => {
    setRadius(selectedRadius.id);
    setTime(selectedTime.id);
    setInvitedFriendList(selectedFriends.map((friend) => friend.id));
  }, [selectedTime, selectedRadius, selectedFriends]);

  return (
    <ScrollView contentContainerStyle={styles.container} horizontal>
      <View style={styles.radius}>
        <SelectBox
          label="Radius"
          options={RADIUS}
          value={selectedRadius}
          onChange={onChangeRadius}
          hideInputFilter={false}
          searchIconColor={COLORS.BLUE}
          arrowIconColor={COLORS.LIGHT_BLUE}
          optionsLabelStyle={{ fontSize: 15 }}
          selectedItemStyle={{ fontSize: 13 }}
          labelStyle={{
            fontSize: 14,
            paddingBottom: 10,
            color: COLORS.LIGHT_BLACK,
            fontFamily: FONT.BOLD_FONT,
          }}
        />
      </View>

      <View style={styles.time}>
        <SelectBox
          label="Time"
          options={TIME}
          value={selectedTime}
          onChange={onChangeTime}
          hideInputFilter={false}
          searchIconColor={COLORS.BLUE}
          arrowIconColor={COLORS.LIGHT_BLUE}
          optionsLabelStyle={{ fontSize: 15 }}
          selectedItemStyle={{ fontSize: 13 }}
          labelStyle={{
            fontSize: 14,
            paddingBottom: 10,
            color: COLORS.LIGHT_BLACK,
            fontFamily: FONT.BOLD_FONT,
          }}
        />
      </View>

      <View style={styles.friends}>
        <SelectBox
          label="Friends"
          options={FriendList()}
          selectedValues={selectedFriends}
          onMultiSelect={onMultiChange}
          onTapClose={onMultiChange}
          isMulti
          searchIconColor={COLORS.BLUE}
          selectedItemStyle={{ fontSize: 13 }}
          arrowIconColor={COLORS.LIGHT_BLUE}
          toggleIconColor={COLORS.LIGHT_BLUE}
          optionsLabelStyle={{ fontSize: 13 }}
          multiOptionContainerStyle={{
            backgroundColor: COLORS.RED,
          }}
          multiOptionsLabelStyle={{ fontSize: 11 }}
          multiListEmptyLabelStyle={{ fontSize: 13 }}
          labelStyle={{
            fontSize: 14,
            paddingBottom: 10,
            color: COLORS.LIGHT_BLACK,
            fontFamily: FONT.BOLD_FONT,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default PublicSelection;

PublicSelection.propTypes = {
  setRadius: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
  setInvitedFriendList: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignContent: "space-between",
    width: "95%",
  },
  radius: {
    width: "25%",
    marginRight: 10,
  },
  time: {
    width: "27%",
    marginRight: 10,
  },
  friends: {
    width: "43%",
    marginLeft: 5,
    overflow: "scroll",
  },
});
