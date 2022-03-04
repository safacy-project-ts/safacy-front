import React, { useState, useEffect } from "react";
import { View } from "react-native";
import SelectBox from "react-native-multi-selectbox";
import { size, xorBy } from "lodash";

import PropTypes from "prop-types";

import FriendList from "./FriendList";
import COLORS from "../constants/COLORS";

const MultiplePublicSelection = ({ setInvitedFriendList }) => {
  const [selectedFriends, setSelectedFriends] = useState([]);

  const onMultiChange = (friend) => {
    return setSelectedFriends(xorBy(selectedFriends, [friend], "id"));
  };

  useEffect(() => {
    // if (selectedFriends?.length > 3) {
    //   alert('cannot select more than 3 friends');
    // }

    setInvitedFriendList(selectedFriends.map((friend) => friend.id));
  }, [selectedFriends]);

  return (
    <View style={{ width: 300, margin: 30 }}>
      <SelectBox
        arrowIconColor={COLORS.LIGHT_BLUE}
        toggleIconColor={COLORS.LIGHT_BLUE}
        searchIconColor={COLORS.LIGHT_BLUE}
        labelStyle={{ fontSize: 15, paddingBottom: 10, color: COLORS.BLACK }}
        selectedItemStyle={{ color: COLORS.LIGHT_BLUE }}
        multiOptionContainerStyle={{ backgroundColor: COLORS.LIGHT_BLUE }}
        label="Friends (max 3)"
        options={FriendList()}
        selectedValues={selectedFriends}
        onMultiSelect={onMultiChange}
        onTapClose={onMultiChange}
        isMulti
      />
    </View>
  );
};

export default MultiplePublicSelection;

MultiplePublicSelection.propTypes = {
  setInvitedFriendList: PropTypes.func.isRequired,
};
