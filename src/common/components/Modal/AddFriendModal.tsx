import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Modal, Text, TextInput, StyleSheet } from "react-native";

import { addFriend } from "../../../store/userSlice";

import CustomButton from "../CustomButton";
import OTHERS from "../../constants/OTHERS";
import COLORS from "../../constants/COLORS";
import FONT from "../../constants/FONT";
import { RootState } from "../../../store";

const AddFriendModal = ({ inviteModalVisible, closeInviteModal }) => {
  const dispatch = useDispatch();
  const [invitedEmail, setInvitedEmail] = useState("");
  const userInfo = useSelector((state: RootState) => state.user);

  const handleEmailInput = (email) => {
    setInvitedEmail(email);
  };

  const handleAddFriend = async () => {
    await dispatch(addFriend({ id: userInfo.id, email: invitedEmail }));

    setInvitedEmail("");
    closeInviteModal();
  };

  return (
    <Modal animationType="slide" visible={inviteModalVisible}>
      <View style={styles.emailInputContainer}>
        <Text style={styles.title}>Add new Friend</Text>
        <TextInput
          value={invitedEmail}
          onChangeText={handleEmailInput}
          placeholder="please input new friend's email"
          style={styles.emailInput}
        />
        <View style={styles.buttons}>
          <CustomButton
            title="Send"
            disabled={false}
            style={styles.inviteBtn}
            onPress={handleAddFriend}
          />
          <CustomButton
            title="Close"
            disabled={false}
            style={styles.closeBtn}
            onPress={closeInviteModal}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddFriendModal;

const styles = StyleSheet.create({
  emailInputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    paddingBottom: 10,
    fontSize: FONT.L,
    fontFamily: FONT.BOLD_FONT,
  },
  emailInput: {
    width: "80%",
    height: 40,
    borderBottomWidth: 1,
    fontSize: FONT.M,
    backgroundColor: COLORS.WHITE,
    borderBottomColor: COLORS.LIGHT_BLACK,
  },
  buttons: {
    width: "50%",
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inviteBtn: {
    width: 80,
    height: 45,
    margin: 10,
    fontSize: FONT.M,
    color: COLORS.BLACK,
    backgroundColor: COLORS.GREY,
  },
  closeBtn: {
    width: 80,
    height: 45,
    margin: 10,
    fontSize: FONT.M,
  },
});
