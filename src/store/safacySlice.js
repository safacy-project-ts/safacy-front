import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URI, TEST_URI } from "@env";

export const getCurrentSafacy = createAsyncThunk(
  "safacy/getCurrentSafacy",
  async (id) => {
    const safacy = await axios.get(`${TEST_URI}/user/current/${id}`);

    return safacy.data;
  },
);

const safacySlice = createSlice({
  name: "safacy",
  initialState: {
    id: null,
    user: null,
    destination: null,
    radius: null,
    time: null,
    invitedFriendList: null,
  },

  extraReducers: {
    [getCurrentSafacy.fulfilled]: (state, action) => {
      const { _id, user, destination, time, radius, invitedFriendList } =
        action.payload;

      state.id = _id;
      state.user = user;
      state.destination = destination;
      state.radius = radius;
      state.time = time;
      state.invitedFriendList = invitedFriendList;
      state.status = "success";
    },
  },
});

export default safacySlice.reducer;
