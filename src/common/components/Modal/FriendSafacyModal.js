/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Modal, Text, StyleSheet } from "react-native";
import * as SMS from "expo-sms";

import PropTypes from "prop-types";

import { FontAwesome5 } from "@expo/vector-icons";

import Map from "../Map";
import PublicScreen from "../../../screen/PublicScreen";

import SafacyBot from "../SafacyBot";
import CustomButton from "../CustomButton";
import FONT from "../../constants/FONT";
import COLORS from "../../constants/COLORS";

const FriendSafacyModal = ({
  safacyModalVisible,
  closeModal,
  nickname,
  id,
}) => {
  const [smsServiceAvailable, setSmsServiceAvailable] = useState(false);

  useEffect(() => {
    checkIfServiceAvailable();
  }, []);

  const checkIfServiceAvailable = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      setSmsServiceAvailable(true);
    }
  };

  const SOSMsg = `<SOS -  현재 친구 위치>

  도와주세요!`;

  const onComposeSms = async () => {
    if (smsServiceAvailable) {
      await SMS.sendSMSAsync("119", SOSMsg);
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={safacyModalVisible}
      style={styles.container}
    >
      <View style={styles.title}>
        <Text style={styles.titleText}>{nickname}'s Safacy</Text>
        <FontAwesome5 name="walking" size={24} color="black" />
      </View>
      <View style={styles.safacybotContainer}>
        <Map />
        <SafacyBot id={id} style={styles.safacybot} />
      </View>
      <View style={styles.buttons}>
        <CustomButton
          title="SOS"
          disabled={false}
          style={styles.sosBtn}
          onPress={onComposeSms}
        />
        <CustomButton
          title="Close"
          disabled={false}
          style={styles.closeBtn}
          onPress={closeModal}
        />
      </View>
    </Modal>
  );
};

export default FriendSafacyModal;

FriendSafacyModal.propTypes = {
  safacyModalVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
  },
  titleText: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.L,
    paddingBottom: 10,
  },
  safacybotContainer: {
    flex: 1,
    alignItems: "center",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 10,
  },
  sosBtn: {
    width: 100,
    height: 45,
    fontSize: FONT.M,
    backgroundColor: COLORS.RED,
    margin: 10,
  },
  closeBtn: {
    width: 100,
    height: 45,
    fontSize: FONT.M,
    backgroundColor: COLORS.LIGHT_BLUE,
    margin: 10,
  },
});
