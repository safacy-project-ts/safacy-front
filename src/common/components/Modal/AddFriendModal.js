import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Modal, Text, TextInput, StyleSheet } from "react-native";

import PropTypes from "prop-types";

import { addFriend } from "../../../store/userSlice";

import CustomButton from "../CustomButton";
import COLORS from "../../constants/COLORS";
import FONT from "../../constants/FONT";

const AddFriendModal = ({ inviteModalVisible, closeInviteModal }) => {
  const dispatch = useDispatch();
  const [invitedEmail, setInvitedEmail] = useState("");
  const { id, result, error } = useSelector((state) => state.user);

  const handleEmailInput = (email) => {
    setInvitedEmail(email);
  };

  const handleAddFriend = async () => {
    await dispatch(addFriend({ id, email: invitedEmail }));

    if (error?.code === 400) {
      alert("email이 올바르지 않습니다");
      return;
    }

    if (result === "Already in Friend List") {
      alert("이미 친구입니다");
      return;
    }

    if (result === "Already Invited") {
      alert("이미 초대된 유저입니다");
      return;
    }

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

AddFriendModal.propTypes = {
  inviteModalVisible: PropTypes.bool.isRequired,
  closeInviteModal: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  emailInputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.L,
    paddingBottom: 10,
  },
  emailInput: {
    width: "80%",
    height: 40,
    fontSize: FONT.M,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_BLACK,
    backgroundColor: COLORS.WHITE,
  },
  buttons: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  inviteBtn: {
    width: 80,
    height: 45,
    fontSize: FONT.M,
    color: COLORS.BLACK,
    backgroundColor: COLORS.GREY,
    margin: 10,
  },
  closeBtn: {
    width: 80,
    height: 45,
    fontSize: FONT.M,
    margin: 10,
  },
});
