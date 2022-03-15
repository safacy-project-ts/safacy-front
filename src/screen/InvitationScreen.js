import React, { useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { acceptInvitation, getUserInfo } from "../store/userSlice";

import CustomButton from "../common/components/CustomButton";
import footer from "../../assets/img/footer.png";
import COLORS from "../common/constants/COLORS";
import FONT from "../common/constants/FONT";

const InvitationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { friendInvitationList, id } = useSelector((state) => state.user);

  const handleFriendList = async (email) => {
    await dispatch(acceptInvitation({ id, email }));
    await dispatch(getUserInfo(id));
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          Invitation{" "}
          <MaterialIcons name="mail" size={24} color={COLORS.BLACK} />
        </Text>
      </View>

      <View style={styles.invitation}>
        <ScrollView style={styles.invitationContainer}>
          {friendInvitationList.map((friend, index) => (
            <View style={styles.invitationInfo} key={index}>
              <MaterialCommunityIcons
                name="human-greeting"
                size={30}
                color={COLORS.BLACK}
                style={{ paddingRight: 10 }}
              />

              <View>
                <Text style={styles.friendText}>{friend}</Text>
              </View>

              <CustomButton
                title="add"
                disabled={false}
                onPress={() => handleFriendList(friend)}
                style={styles.addBtn}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Image source={footer} />
      </View>
    </View>
  );
};

export default InvitationScreen;

InvitationScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  title: {
    flex: 0.8,
    alignItems: "center",
  },
  titleText: {
    paddingTop: 40,
    fontSize: FONT.XL,
    color: COLORS.BLACK,
    fontFamily: FONT.BOLD_FONT,
  },
  invitation: {
    flex: 4,
    alignItems: "center",
  },
  invitationContainer: {
    width: "90%",
    padding: 20,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.LIGHT_BLACK,
  },
  invitationInfo: {
    marginBottom: 5,
    flexDirection: "row",
  },
  friendText: {
    paddingTop: 5,
    fontSize: FONT.M,
    fontFamily: FONT.BOLD_FONT,
  },
  addBtn: {
    width: "100%",
    height: "50%",
    padding: 10,
    marginTop: 3,
    marginLeft: 8,
    lineHeight: 10,
    fontSize: FONT.M,
    justifyContent: "center",
    color: COLORS.LIGHT_BLACK,
    backgroundColor: COLORS.WHITE,
  },
  footer: {
    flex: 1,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
