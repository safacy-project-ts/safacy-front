import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import PropTypes from "prop-types";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import Timer from "../common/components/Timer";
import FONT from "../common/constants/FONT";
import COLORS from "../common/constants/COLORS";
import { getUserInfo } from "../store/userSlice";

const FriendListScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getUserInfo(id));
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
          <FontAwesome5 name="user-friends" size={24} color="black" />
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
                  id: safacyInvitationList[index]._id,
                });
              }}
              key={item._id}
            >
              <View>
                <MaterialCommunityIcons
                  name="face-outline"
                  size={24}
                  color="black"
                />
              </View>
              <View>
                <Text>{item.email}</Text>
              </View>
              <View>
                <Text>{item.nickname}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {publicMode && (
        <View style={styles.timer}>
          <Text>Public Mode</Text>
          <Timer sec={remaining} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
  },
  title: {
    flex: 0.8,
    alignItems: "center",
    width: 300,
    borderBottomColor: COLORS.GREY,
    borderBottomWidth: 1,
  },
  friendList: {
    flex: 4,
    alignItems: "center",
    paddingTop: 30,
  },
  freinds: {
    width: 300,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.LIGHT_BLACK,
    padding: 10,
  },
  timer: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    fontFamily: FONT.BOLD_FONT,
    fontSize: FONT.XL,
    color: COLORS.BLACK,
    paddingTop: 50,
  },
});

export default FriendListScreen;

FriendListScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
