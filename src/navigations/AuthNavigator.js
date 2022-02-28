import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import SignInScreen from '../screen/Auth/SignInScreen';
import MainNavigator from './MainNavigator';

const AuthNavigator = () => {
  const { id } = useSelector((state) => state.user);

  return (
    <NavigationContainer>
      {id ? <MainNavigator /> : <SignInScreen />}
    </NavigationContainer>
  );
};

export default AuthNavigator;
