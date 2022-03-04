import React from "react";
import { useSelector } from "react-redux";

const FriendList = () => {
  const { myFriendList } = useSelector((state) => state.user);

  const friendListConstants = [];

  const getFriendListItems = (nickname, email) => {
    return { item: nickname, id: email };
  };

  for (let i = 0; i < myFriendList.length; i += 1) {
    friendListConstants.push(
      getFriendListItems(myFriendList[i].nickname, myFriendList[i].email),
    );
  }

  return friendListConstants;
};

export default FriendList;
