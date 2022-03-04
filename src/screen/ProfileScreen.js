import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

import Timer from "../common/components/Timer";
import footer from "../../assets/img/footer.png";
import FONT from "../common/constants/FONT";
import COLORS from "../common/constants/COLORS";
import AddModal from "../common/constants/Modal/AddModal";

const ProfileScreen = () => {
  const [inviteModalVisible, setInviteModalVisible] = useState(false);

  const openInviteModal = () => {
    setInviteModalVisible(true);
  };

  const closeInviteModal = () => {
    setInviteModalVisible(false);
  };

  const { nickname, email, publicMode, myFriendList, safacyHistory } =
    useSelector((state) => state.user);
  const { remaining } = useSelector((state) => state.timer);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          My Profile <AntDesign name="profile" size={24} color="black" />
        </Text>
      </View>
      <View style={styles.information}>
        <View style={styles.profile}>
          <MaterialIcons
            style={styles.picture}
            name="face"
            size={80}
            color="black"
          />
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.email}>{email}</Text>
          {publicMode && <Timer sec={remaining} />}
        </View>
        <View style={styles.friendList}>
          <Text style={styles.addFriend}>
            Add Friend{" "}
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={15}
              color="black"
              onPress={openInviteModal}
            />
          </Text>
          <ScrollView style={styles.friendScroll}>
            {myFriendList?.map((friend) => (
              <Text style={styles.friendName} key={friend._id}>
                <AntDesign name="user" size={15} color="black" />
                {"  "}
                {friend.nickname}
              </Text>
            ))}
          </ScrollView>
        </View>
        <AddModal
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
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
  },
  title: {
    flex: 0.8,
    width: 300,
    alignItems: "center",
    borderBottomColor: COLORS.GREY,
    borderBottomWidth: 1,
  },
  titleText: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.XL,
    color: COLORS.BLACK,
    paddingTop: 40,
  },
  information: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  profile: {
    width: "40%",
    height: "80%",
    borderColor: COLORS.LIGHT_BLACK,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    margin: 10,
  },
  picture: {
    paddingTop: 15,
  },
  nickname: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.M,
    paddingTop: 10,
  },
  email: {
    fontSize: FONT.S,
    paddingTop: 5,
  },
  friendList: {
    width: "40%",
    height: "80%",
    borderColor: COLORS.LIGHT_BLACK,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  addFriend: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.M,
    marginTop: 10,
    marginBottom: 10,
  },
  friendScroll: {},
  friendName: {
    fontFamily: FONT.REGULAR_FONT,

    margin: 3,
  },
  history: {
    flex: 2,
    width: "90%",
    alignItems: "center",
  },
  historyText: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.L,
    paddingBottom: 10,
  },
  historyList: {
    width: "100%",
  },
  historyDestination: {
    width: 300,
    height: 30,
    backgroundColor: COLORS.LIGHT_BLUE,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    margin: 5,
    padding: 5,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 5,
  },
});
