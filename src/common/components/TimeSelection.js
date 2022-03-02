import React, { useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';

import TIME from '../constants/TIME';

const TimeSelection = ({ setTime }) => {
  return (
    <RNPickerSelect onValueChange={(value) => setTime(value)} items={TIME} />
  );
};

export default TimeSelection;

TimeSelection.propTypes = {
  setTime: PropTypes.func.isRequired,
};
