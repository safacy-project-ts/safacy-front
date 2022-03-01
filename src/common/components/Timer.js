import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const Timer = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  return (
    <View style={styles.continer}>
      <View style={styles.upper}>
        <TextInput
          style={styles.time}
          onChangeText={onChangeText}
          value={text}
        />
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {},
  upper: {},
  lower: {},
  time: {
    borderBottomColor: 'black',
  },
});
