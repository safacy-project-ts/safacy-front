import React, { useEffect } from "react";
import * as Google from "expo-google-app-auth";
import { GOOGLE_IOS_CLIENT_ID } from "@env";

import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/authSlice";

import CustomButton from "../../common/components/CustomButton";
import FONTS from "../../common/constants/FONT";
import LOGO from "../../../assets/img/logo.png";
import COLORS from "../../common/constants/COLORS";

const config = {
  iosClientId: GOOGLE_IOS_CLIENT_ID,
  scopes: ["profile", "email"],
};

const SignInScreen = () => {
  const dispatch = useDispatch();

  const signInWithGoogleAsync = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync(config);

      if (type === "success") {
        const { email, givenName: nickname } = user;
        await dispatch(signIn({ email, nickname }));
      }
      return { cancelled: true };
    } catch (error) {
      return { error: true };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.main}>
        <Image style={styles.logo} source={LOGO} />
        <Text style={styles.title}>Safacy</Text>
        <Text style={styles.description}>for your safacy & privacy</Text>
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.signInBtn}>
          <CustomButton
            title="Google SingIn"
            disabled={false}
            onPress={() => signInWithGoogleAsync()}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_BLACK,
    backgroundColor: COLORS.LIGHT_BLUE,
  },
  main: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  btnContainer: {
    flex: 2,
    alignItems: "center",
  },
  signInBtn: {
    width: 300,
    paddingTop: 30,
    borderTopColor: COLORS.GREY,
    borderTopWidth: 1,
    alignItems: "center",
  },
  logo: {
    width: "60%",
    height: "50%",
    resizeMode: "contain",
  },
  title: {
    fontFamily: FONTS.BOLD_FONT,
    fontSize: FONTS.XXL,
    color: "#75a9f9",
  },
  description: {
    fontFamily: FONTS.REGULAR_FONT,
  },
  button: {
    borderRadius: 10,
  },
});
