import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';

const RadiusSelection = ({ setRadius }) => {
  const radiusItems = [
    { label: '50m', value: '50' },
    { label: '100m', value: '100' },
    { label: '150m', value: '150' },
  ];

  return (
    <RNPickerSelect
      onValueChange={(radius) => setRadius(radius)}
      items={radiusItems}
    />
  );
};

export default RadiusSelection;

RadiusSelection.propTypes = {
  setRadius: PropTypes.func.isRequired,
};
