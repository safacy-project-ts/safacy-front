import React, { useEffect } from 'react';
import * as Google from 'expo-google-app-auth';
import { GOOGLE_IOS_CLIENT_ID } from '@env';

import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/authSlice';

import FONTS from '../../common/constants/FONT';
import COLOR from '../../common/constants/COLORS';
import LOGO from '../../../assets/img/logo.png';

const config = {
  iosClientId: GOOGLE_IOS_CLIENT_ID,
  scopes: ['profile', 'email'],
};

const SignInScreen = () => {
  const dispatch = useDispatch();

  const signInWithGoogleAsync = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync(config);

      if (type === 'success') {
        const { email, givenName: nickname } = user;
        dispatch(signIn({ email, nickname }));
      }
      return { cancelled: true };
    } catch (error) {
      return { error: true };
    }
  };

  return (
    <View style={styles.screen}>
      <Image style={styles.logo} source={LOGO} />
      <Text style={styles.title}>Safacy</Text>
      <Text style={styles.description}>for your safacy & privacy</Text>
      <Button
        style={styles.button}
        title="Google SignIn"
        onPress={() => signInWithGoogleAsync()}
      />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  logo: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  title: {
    fontFamily: FONTS.BOLD_FONT,
    fontSize: FONTS.XXL,
    color: '#75a9f9',
  },
  description: {},
  button: {
    backgroundColor: COLOR.RED,
  },
});
