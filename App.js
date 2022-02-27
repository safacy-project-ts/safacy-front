import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import AuthScreen from './src/screen/Auth/AuthScreen';
import SignInScreen from './src/screen/Auth/SignInScreen';

import store from './src/store/index';

const fetchFonts = () => {
  return Font.loadAsync({
    'quicksand-regular': require('./assets/fonts/Quicksand-Regular.ttf'),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={() => console.log('error')}
      />
    );
  }
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <SignInScreen />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
