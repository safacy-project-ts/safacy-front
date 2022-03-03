import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, Button } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import COLORS from '../constants/COLORS';

import SAFACY_BOT from '../constants/SAFACY_BOT';

const SafacyBot = () => {
  // 이상행동에 대한 감지를 하면 safacyBot store에 저장하고,
  // 저장한 내용들을 렌더링해주기

  return (
    <View style={styles.container}>
      <Text>Safacy Chat</Text>
    </View>
  );
};

export default SafacyBot;

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 150,
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.GREY,
  },
});
