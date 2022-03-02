import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { size, xorBy } from 'lodash';

import PropTypes from 'prop-types';

import TIME from '../constants/TIME';
import RADIUS from '../constants/RADIUS';
import COLORS from '../constants/COLORS';

const K_OPTIONS = [
  {
    item: 'Juventus',
    id: 'JUVE',
  },
  {
    item: 'Real Madrid',
    id: 'RM',
  },
  {
    item: 'Barcelona',
    id: 'BR',
  },
  {
    item: 'PSG',
    id: 'PSG',
  },
  {
    item: 'FC Bayern Munich',
    id: 'FBM',
  },
  {
    item: 'Manchester United FC',
    id: 'MUN',
  },
  {
    item: 'Manchester City FC',
    id: 'MCI',
  },
  {
    item: 'Everton FC',
    id: 'EVE',
  },
  {
    item: 'Tottenham Hotspur FC',
    id: 'TOT',
  },
  {
    item: 'Chelsea FC',
    id: 'CHE',
  },
  {
    item: 'Liverpool FC',
    id: 'LIV',
  },
  {
    item: 'Arsenal FC',
    id: 'ARS',
  },

  {
    item: 'Leicester City FC',
    id: 'LEI',
  },
];

const Selection = ({ setRadius, setTime, setInvitedFriendList }) => {
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
    if (selectedFriends.length > 3) {
      alert('cannot select more than 3 friends');
    }
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
        options={K_OPTIONS}
        selectedValues={selectedFriends}
        onMultiSelect={onMultiChange}
        onTapClose={onMultiChange}
        isMulti
      />
    </View>
  );
};

export default Selection;

Selection.propTypes = {
  setRadius: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
  setInvitedFriendList: PropTypes.func.isRequired,
};
