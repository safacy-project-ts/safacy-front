import React, { useEffect } from 'react';
import * as Google from 'expo-google-app-auth';
import { useNavigation } from '@react-navigation/native';

import { GOOGLE_IOS_CLIENT_ID } from '@env';
import { View, Text, Button } from 'react-native';

const config = {
  iosClientId: GOOGLE_IOS_CLIENT_ID,
  scopes: ['profile', 'email'],
};

const SignInScreen = () => {
  async function signInWithGoogleAsync() {
    try {
      const { type, accessToken, user } = await Google.logInAsync(config);

      if (type === 'success') {
        return accessToken;
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  }

  return (
    <View>
      <Text>Safacy</Text>
      <Button title="Google SignIn" onPress={() => signInWithGoogleAsync()} />
    </View>
  );
};

export default SignInScreen;
