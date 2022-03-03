import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
// import * as BackgroundFetch from 'expo-background-fetch';
// import * as TaskManager from 'expo-task-manager';

import AuthNavigator from './src/navigations/AuthNavigator';
import store from './src/store/index';
import COLORS from './src/common/constants/COLORS';

const fetchFonts = () => {
  return Font.loadAsync({
    'quicksand-regular': require('./assets/fonts/Quicksand-Regular.ttf'),
    'quicksand-bold': require('./assets/fonts/Quicksand-Bold.ttf'),
  });
};

// const BACKGROUND_FETCH_TASK = 'background-fetch';

// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//   const now = Date.now();
//   console.log(
//     `Got background fetch call at date: ${new Date(now).toISOString()}`,
//   );
//   return BackgroundFetch.BackgroundFetchResult.NewData;
// });

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
        <AuthNavigator />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
  },
});

export default App;
