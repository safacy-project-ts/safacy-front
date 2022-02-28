import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View } from 'react-native';

const InvitationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Main page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InvitationScreen;
