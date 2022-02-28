import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from '../api/axiosInstance';
import axios from 'axios';

export const getUserSafacy = createAsyncThunk(
  'safacy/getUserSafacy',
  async (id) => {
    const safacy = await axios.get(`http://localhost:8080/safacy/${id}`);
    return safacy.data;
  },
);

const safacySlice = createSlice({
  name: 'safacy',
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
    [getUserSafacy.pending]: (state, action) => {
      state.status = 'loading...';
    },
    [getUserSafacy.fulfilled]: (state, action) => {
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
    },
    [getUserSafacy.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default safacySlice.reducer;
