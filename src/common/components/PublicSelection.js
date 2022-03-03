import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { size, xorBy } from 'lodash';

import PropTypes from 'prop-types';

import friendList from './friendList';
import TIME from '../constants/TIME';
import RADIUS from '../constants/RADIUS';
import COLORS from '../constants/COLORS';

const PublicSelection = ({ setRadius, setTime, setInvitedFriendList }) => {
  const [selectedTime, setSelectedTime] = useState({});
  const [selectedRadius, setSelectedRadius] = useState({});
  const [selectedFriends, setSelectedFriends] = useState([]);

  const onChangeRadius = (radius) => {
    return setSelectedRadius(radius);
  };

  const onChangeTime = (time) => {
    return setSelectedTime(time);
  };

  const onMultiChange = (friend) => {
    return setSelectedFriends(xorBy(selectedFriends, [friend], 'id'));
  };

  useEffect(() => {
    // if (selectedFriends?.length > 3) {
    //   alert('cannot select more than 3 friends');
    // }

    setRadius(selectedRadius.id);
    setTime(selectedTime.id);
    setInvitedFriendList(selectedFriends.map((friend) => friend.id));
  }, [selectedTime, selectedRadius, selectedFriends]);

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
      <SelectBox
        arrowIconColor={COLORS.LIGHT_BLUE}
        toggleIconColor={COLORS.LIGHT_BLUE}
        searchIconColor={COLORS.LIGHT_BLUE}
        labelStyle={{ fontSize: 15, paddingBottom: 10, color: COLORS.BLACK }}
        selectedItemStyle={{ color: COLORS.LIGHT_BLUE }}
        multiOptionContainerStyle={{ backgroundColor: COLORS.LIGHT_BLUE }}
        label="Friends (max 3)"
        options={friendList()}
        selectedValues={selectedFriends}
        onMultiSelect={onMultiChange}
        onTapClose={onMultiChange}
        isMulti
      />
    </View>
  );
};

export default PublicSelection;

PublicSelection.propTypes = {
  setRadius: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
  setInvitedFriendList: PropTypes.func.isRequired,
};
