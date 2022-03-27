import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { getUserInfo } from "../store/userSlice";

import AddFriendModal from "../common/components/Modal/AddFriendModal";
import FONT from "../common/constants/FONT";
import COLORS from "../common/constants/COLORS";
import footer from "../../assets/img/footer.png";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [inviteModalVisible, setInviteModalVisible] = useState(false);

  const openInviteModal = () => {
    setInviteModalVisible(true);
  };

  const closeInviteModal = () => {
    setInviteModalVisible(false);
  };

  const {
    id,
    nickname,
    email,
    publicMode,
    myFriendList,
    safacyHistory,
    friendInvitationList,
  } = useSelector((state) => state.user);

  const { remaining } = useSelector((state) => state.timer);
  const invitationCount = friendInvitationList.length;

  useEffect(async () => {
    await dispatch(getUserInfo(id));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          My Profile <AntDesign name="profile" size={24} color={COLORS.BLACK} />
        </Text>
      </View>
      <View style={styles.information}>
        <View style={styles.profile}>
          <MaterialIcons
            style={styles.picture}
            name="face"
            size={80}
            color={COLORS.BLACK}
          />
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.invitation}>
            {invitationCount === 0 ? "" : `Invitation : ${invitationCount}`}
          </Text>
        </View>
        <View style={styles.friendList}>
          <Text style={styles.addFriend}>
            Add Friend{" "}
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={15}
              color={COLORS.BLACK}
              onPress={openInviteModal}
            />
          </Text>
          <ScrollView style={styles.friendScroll}>
            {myFriendList?.map((friend) => (
              <Text style={styles.friendName} key={friend._id}>
                <AntDesign name="user" size={15} color={COLORS.BLACK} />
                {"  "}
                {friend.nickname}
              </Text>
            ))}
          </ScrollView>
        </View>
        <AddFriendModal
          inviteModalVisible={inviteModalVisible}
          closeInviteModal={closeInviteModal}
        />
      </View>
      <View style={styles.history}>
        <Text style={styles.historyText}>My History</Text>
        <ScrollView>
          {safacyHistory?.map((safacy) => (
            <View style={styles.historyList} key={safacy._id}>
              <Text style={styles.historyDestination}>
                {safacy.destination}
              </Text>
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

export default ProfileScreen;

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
  titleText: {
    paddingTop: 40,
    fontSize: FONT.XL,
    color: COLORS.BLACK,
    fontFamily: FONT.BOLD_FONT,
  },
  information: {
    flex: 2,
    alignItems: "center",
    flexDirection: "row",
  },
  profile: {
    width: "40%",
    height: "80%",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    margin: 10,
    borderColor: COLORS.LIGHT_BLACK,
  },
  picture: {
    paddingTop: 15,
  },
  nickname: {
    paddingTop: 10,
    fontSize: FONT.M,
    fontFamily: FONT.BOLD_FONT,
  },
  email: {
    paddingTop: 5,
    fontSize: FONT.S,
  },
  invitation: {
    marginTop: 10,
    fontSize: FONT.S,
    color: COLORS.INVITATION,
    fontFamily: FONT.REGULAR_FONT,
  },
  friendList: {
    width: "40%",
    height: "80%",
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    borderColor: COLORS.LIGHT_BLACK,
  },
  addFriend: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: FONT.M,
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONT.BOLD_FONT,
  },
  friendName: {
    margin: 3,
    fontFamily: FONT.REGULAR_FONT,
  },
  history: {
    flex: 2,
    width: "90%",
    alignItems: "center",
  },
  historyText: {
    paddingBottom: 10,
    fontSize: FONT.L,
    fontFamily: FONT.BOLD_FONT,
  },
  historyList: {
    width: "100%",
  },
  historyDestination: {
    width: 300,
    height: 30,
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: COLORS.LIGHT_BLUE,
  },
  footer: {
    flex: 1,
    marginBottom: 5,
    justifyContent: "flex-end",
  },
});
