import React, { useState } from "react";
import { View, Modal, Button, Text, TextInput, StyleSheet } from "react-native";

import PropTypes from "prop-types";

import CustomButton from "../../components/CustomButton";
import COLORS from "../COLORS";
import FONT from "../FONT";

const AddModal = ({ inviteModalVisible, closeInviteModal }) => {
  const [invitedEmail, setInvitedEmail] = useState("");

  const handleEmailInput = (email) => {
    setInvitedEmail(email);
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
            title="Add"
            disabled={false}
            style={styles.inviteBtn}
            onPress={handleEmailInput}
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

export default AddModal;

AddModal.propTypes = {
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
