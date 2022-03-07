import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Modal, Text, TextInput, StyleSheet } from "react-native";

import PropTypes from "prop-types";

import { FontAwesome5 } from "@expo/vector-icons";

import CustomButton from "../CustomButton";
import COLORS from "../../constants/COLORS";
import FONT from "../../constants/FONT";

const FriendSafacyModal = ({ safacyModalVisible, closeModal }) => {
  const dispatch = useDispatch();
  const { id, result, error } = useSelector((state) => state.user);

  return (
    <Modal animationType="slide" visible={safacyModalVisible}>
      <View style={styles.emailInputContainer}>
        <Text style={styles.title}>Safacy</Text>
        <FontAwesome5 name="walking" size={24} color="black" />
        <View style={styles.buttons}>
          <CustomButton
            title="Close"
            disabled={false}
            style={styles.closeBtn}
            onPress={closeModal}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FriendSafacyModal;

FriendSafacyModal.propTypes = {
  safacyModalVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  emailInputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.XL,
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
    alignItems: "center",
    margin: 10,
  },
  closeBtn: {
    width: 100,
    height: 45,
    fontSize: FONT.M,
    margin: 10,
  },
});
