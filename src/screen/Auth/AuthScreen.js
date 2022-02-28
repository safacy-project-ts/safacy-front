// import React, { useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { Provider } from 'react-redux';
// import { StyleSheet, Text, View } from 'react-native';
// import AppLoading from 'expo-app-loading';
// import * as Font from 'expo-font';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import store from '../../store/index';

// import LoadingScreen from './LoadingScreen';
// import SignInScreen from './SignInScreen';

// const Stack = createStackNavigator();

// // const fetchFonts = () => {
// //   return Font.loadAsync({
// //     'quicksand-regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
// //   });
// // };

// const AuthScreen = () => {
//   // const [fontLoaded, setFontLoaded] = useState(false);

//   // if (!fontLoaded) {
//   //   return (
//   //     <AppLoading
//   //       startAsync={fetchFonts}
//   //       onFinish={() => {
//   //         setFontLoaded(true);
//   //       }}
//   //       onError={() => console.log('error')}
//   //     />
//   //   );
//   // }

//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="SignIn">
//           <Stack.Screen name="Loading" component={LoadingScreen} />
//           <Stack.Screen name="SignIn" component={SignInScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default AuthScreen;
