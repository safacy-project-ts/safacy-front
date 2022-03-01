import React, { useState } from 'react';

import { View, Button, Platform, Text, StyleSheet } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

const TimePicker = () => {
  const [time, setTime] = useState(new Date());

  console.log(time);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    // if (Platform.OS === 'ios');
    setTime(currentDate);
  };

  return (
    <View style={styles.container}>
      <View>
        <DateTimePicker
          style={styles.dateTime}
          testID="dateTimePicker"
          value={time}
          mode="time"
          minuteInterval={30}
          is24Hour
          display="default"
          onChange={onChange}
        />
      </View>
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  dateTime: {
    width: 190,
    height: 50,
  },
});
