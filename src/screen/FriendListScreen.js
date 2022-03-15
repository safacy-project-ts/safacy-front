/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import PropTypes from "prop-types";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { getUserInfo } from "../store/userSlice";
import FONT from "../common/constants/FONT";
import COLORS from "../common/constants/COLORS";
import footer from "../../assets/img/footer.png";

const FriendListScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [safacyModalVisible, setSafacyModalVisible] = useState(false);

  const openFriendSafayModal = () => {
    setSafacyModalVisible(true);
  };

  const closeModal = () => {
    setSafacyModalVisible(false);
  };

  useEffect(async () => {
    await dispatch(getUserInfo(id));
    return () => console.log("stop");
  }, []);

  const { safacyInvitationList, publicMode, id } = useSelector(
    (state) => state.user,
  );
  const { remaining } = useSelector((state) => state.timer);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          Friend List{" "}
          <FontAwesome5 name="user-friends" size={24} color={COLORS.BLACK} />
        </Text>
      </View>

      <View style={styles.friendList}>
        {safacyInvitationList?.map((item, index) => (
          <View key={item._id}>
            <TouchableOpacity
              style={styles.freinds}
              title={item.nickname}
              disabled={false}
              onPress={() => {
                navigation.navigate("Public", {
                  id: item._id,
                });
              }}
            >
              <View>
                <MaterialCommunityIcons
                  name="face-outline"
                  size={24}
                  color={COLORS.BLACK}
                />
              </View>
              <View>
                <Text style={styles.nickname}>{item.nickname}'s Safacy</Text>
              </View>
              <MaterialIcons
                name="lock-open"
                size={24}
                color={COLORS.LIGHT_BLUE}
                style={styles.lockIcon}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <Image source={footer} />
      </View>
    </View>
  );
};

export default FriendListScreen;

FriendListScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
  },
  title: {
    flex: 0.8,
    width: 300,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GREY,
  },
  friendList: {
    flex: 4,
    paddingTop: 30,
    alignItems: "center",
  },
  freinds: {
    width: 300,
    height: 50,
    padding: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.LIGHT_BLACK,
  },
  nickname: {
    paddingLeft: 20,
    paddingTop: 3,
    fontSize: FONT.M,
    fontFamily: FONT.BOLD_FONT,
  },
  timer: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    paddingTop: 50,
    fontSize: FONT.XL,
    color: COLORS.BLACK,
    fontFamily: FONT.BOLD_FONT,
  },
  lockIcon: {
    paddingLeft: 85,
  },
  footer: {
    flex: 1,
    marginBottom: 15,
    justifyContent: "flex-end",
  },
});
