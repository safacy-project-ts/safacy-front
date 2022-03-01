import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from '../api/axiosInstance';
import axios from 'axios';

export const getUserInfo = createAsyncThunk('user/getUserInfo', async (id) => {
  const user = await axios.get(`http://localhost:8080/user/${id}`);

  return user.data;
});

export const startPublic = createAsyncThunk('user/startPublic', async (id) => {
  const publicMode = await axios.put(`http://localhost:8080/user/${id}/public`);

  return publicMode.data;
});

export const stopPublic = createAsyncThunk(
  'user/stopPublic',
  async ({ id, safacyId }) => {
    const privacyMode = await axios.put(
      `http://localhost:8080/user/${id}/privacy`,
      { safacyId },
    );

    return privacyMode.data;
  },
);

export const createSafacy = createAsyncThunk(
  'user/createSafacy',
  async ({ id, destination, radius, time, invitedFriendList }) => {
    const newSafacy = await axios.post(`http://localhost:8080/user/${id}/new`, {
      destination,
      radius,
      time,
      invitedFriendList,
    });

    return newSafacy.data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    _id: null,
    email: null,
    nickname: null,
    publicMode: null,
    myFriendList: null,
    friendInvitationList: null,
    safacyHistory: null,
    safacyInvitationList: null,
  },

  extraReducers: {
    [getUserInfo.pending]: (state, action) => {
      state.status = 'loading...';
    },
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
      state.status = 'success';
    },
    [getUserInfo.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [startPublic.fulfilled]: (state, action) => {
      const { publicMode } = action.payload;
      state.publicMode = publicMode;
    },
    [createSafacy.failed]: (state, action) => {
      state.status = 'success';
    },
  },
});

export default userSlice.reducer;
