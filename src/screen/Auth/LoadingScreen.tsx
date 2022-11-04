import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import COLORS from "../../common/constants/COLORS";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingScreen;
