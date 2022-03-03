import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import LoadingScreen from '../screen/Auth/LoadingScreen';
import SignInScreen from '../screen/Auth/SignInScreen';
import MainNavigator from './MainNavigator';

const AuthNavigator = () => {
  const { id, status } = useSelector((state) => state.auth);

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {id ? <MainNavigator /> : <SignInScreen />}
    </NavigationContainer>
  );
};

export default AuthNavigator;
