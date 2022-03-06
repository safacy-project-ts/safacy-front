import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, LogBox } from "react-native";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";

import PropTypes from "prop-types";

import TIME from "../constants/TIME";
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

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container} horizontal>
      <View style={styles.radius}>
        <SelectBox
          label="Radius"
          arrowIconColor={COLORS.LIGHT_BLUE}
          labelStyle={{ fontSize: 15, paddingBottom: 10, color: COLORS.BLACK }}
          options={RADIUS}
          value={selectedRadius}
          onChange={onChangeRadius}
          hideInputFilter={false}
        />
      </View>

      <View style={styles.time}>
        <SelectBox
          label="Time"
          labelStyle={{ fontSize: 15, paddingBottom: 10, color: COLORS.BLACK }}
          arrowIconColor={COLORS.LIGHT_BLUE}
          options={TIME}
          value={selectedTime}
          onChange={onChangeTime}
          hideInputFilter={false}
        />
      </View>

      <View style={styles.friends}>
        <SelectBox
          arrowIconColor={COLORS.LIGHT_BLUE}
          toggleIconColor={COLORS.LIGHT_BLUE}
          searchIconColor={COLORS.LIGHT_BLUE}
          labelStyle={{ fontSize: 15, paddingBottom: 10, color: COLORS.BLACK }}
          selectedItemStyle={{ color: COLORS.LIGHT_BLUE }}
          multiOptionContainerStyle={{ backgroundColor: COLORS.RED }}
          label="Friends"
          options={FriendList()}
          selectedValues={selectedFriends}
          onMultiSelect={onMultiChange}
          onTapClose={onMultiChange}
          isMulti
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
    width: "30%",
    marginRight: 10,
  },
  time: {
    width: "35%",
    marginRight: 10,
  },
  friends: {
    marginLeft: 5,
    overflow: "scroll",
  },
});
