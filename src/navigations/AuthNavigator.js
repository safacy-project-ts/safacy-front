import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigator";

import LoadingScreen from "../screen/Auth/LoadingScreen";
import SignInScreen from "../screen/Auth/SignInScreen";

const AuthNavigator = () => {
  const { id, status } = useSelector((state) => state.auth);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {id ? <MainNavigator /> : <SignInScreen />}
    </NavigationContainer>
  );
};

export default AuthNavigator;
