import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (id: string) => {
    const user = await axios.get(
      `${process.env.REACT_APP_TEST_URI}/user/${id}`,
    );

    return user.data;
  },
);

export const startPublic = createAsyncThunk("user/startPublic", async (id) => {
  const publicMode = await axios.put(
    `${process.env.REACT_APP_TEST_URI}/user/${id}/public`,
  );

  return publicMode.data;
});

export const stopPublic = createAsyncThunk(
  "user/stopPublic",
  async ({ id, safacyId }: { id: string; safacyId: string }) => {
    const privacyMode = await axios.put(
      `${process.env.REACT_APP_TEST_URI}/user/${id}/privacy`,
      {
        safacyId,
      },
    );

    return privacyMode.data;
  },
);

export const createSafacy = createAsyncThunk(
  "user/createSafacy",
  async ({
    id,
    destination,
    radius,
    time,
    invitedFriendList,
    userDestination,
  }: {
    id: string;
    destination: string;
    radius: number;
    time: number;
    invitedFriendList: string[];
    userDestination: string[];
  }) => {
    const newSafacy = await axios.post(
      `${process.env.REACT_APP_TEST_URI}/user/${id}/new`,
      {
        destination,
        radius,
        time,
        invitedFriendList,
        userDestination,
      },
    );

    return newSafacy.data;
  },
);

export const addFriend = createAsyncThunk(
  "user/addFriend",
  async ({ id, email }: { id: string; email: string }) => {
    const newFriend = await axios.put(
      `${process.env.REACT_APP_TEST_URI}/user/${id}/friend/new`,
      {
        email,
      },
    );

    return newFriend.data;
  },
);

export const acceptInvitation = createAsyncThunk(
  "user/acceptInvitation",
  async ({ id, email }: { id: string; email: string }) => {
    const newFriendList = await axios.put(
      `${process.env.REACT_APP_TEST_URI}/user/${id}/friend/invitation`,
      {
        email,
      },
    );

    return newFriendList.data;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    email: null,
    nickname: null,
    publicMode: null,
    myFriendList: null,
    friendInvitationList: null,
    safacyHistory: null,
    safacyInvitationList: null,
    status: "",
  },

  extraReducers: {
    [getUserInfo.fulfilled]: (state, action) => {
      const {
        _id,
        email,
        nickname,
        publicMode,
        myFriendList,
        friendInvitationList,
        safacyHistory,
        safacyInvitationList,
      } = action.payload;

      state.id = _id;
      state.email = email;
      state.nickname = nickname;
      state.publicMode = publicMode;
      state.myFriendList = myFriendList;
      state.friendInvitationList = friendInvitationList;
      state.safacyHistory = safacyHistory;
      state.safacyInvitationList = safacyInvitationList;
      state.status = "success";
    },
    [startPublic.fulfilled]: (state, { payload }) => {
      const { publicMode } = payload;
      state.publicMode = publicMode;
    },
    [createSafacy.fulfilled]: (state) => {
      state.status = "success";
    },
    [stopPublic.fulfilled]: (state) => {
      state.status = "success";
    },
    [addFriend.fulfilled]: (state, { payload }) => {
      state.result = payload.result;
      state.status = "success";
    },
    [acceptInvitation.fulfilled]: (state) => {
      state.status = "success";
    },
  },
  reducers: undefined,
});

export default userSlice.reducer;
