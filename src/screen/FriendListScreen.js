import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { StyleSheet, Text, View, Button } from 'react-native';

const FriendListScreen = ({ navigation }) => {
  const { safacyInvitationList } = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <Text>
        Friend List <FontAwesome5 name="user-friends" size={24} color="black" />
      </Text>
      {safacyInvitationList?.map((item, index) => (
        <Button
          title={item.nickname}
          onPress={() => {
            navigation.navigate('Public', {
              id: safacyInvitationList[index]._id,
            });
          }}
          key={item._id}
        />
      ))}
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

export default FriendListScreen;

FriendListScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
