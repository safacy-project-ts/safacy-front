import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URI, TEST_URI } from "@env";

export const getCurrentSafacy = createAsyncThunk(
  "user/getCurrentSafacy",
  async (id) => {
    const safacy = await axios.get(`${TEST_URI}/user/current/${id}`);

    return safacy.data;
  },
);

export const updateSafacyMsg = createAsyncThunk(
  "safacy/updateSafacyMsg",
  async ({ id, message }) => {
    const updatedSafacyMsg = await axios.put(
      `${TEST_URI}/safacy/${id}/message/update`,
      {
        message,
      },
    );

    return updatedSafacyMsg.data;
  },
);

export const updateOriginLocation = createAsyncThunk(
  "safacy/updateOriginLocation",
  async ({ id, location }) => {
    const updatedSafacyMsg = await axios.put(
      `${TEST_URI}/safacy/${id}/location/update`,
      {
        location,
      },
    );

    return updateOriginLocation.data;
  },
);

export const updateDeslocation = createAsyncThunk(
  "safacy/updateDeslocation",
  async ({ id, deslocation }) => {
    const updatedSafacyMsg = await axios.put(
      `${TEST_URI}/safacy/${id}/deslocation/update`,
      {
        deslocation,
      },
    );

    return updateDeslocation.data;
  },
);

const safacySlice = createSlice({
  name: "safacy",
  initialState: {
    id: "",
    user: "",
    destination: [],
    radius: "",
    time: "",
    invitedFriendList: [],
    safacyBotMsg: [],
    originLocation: [],
    desLocation: [],
    userDestination: [],
  },
  reducers: {
    clearCurrentSafacy: (state, action) => {
      state.id = "";
      state.user = "";
      state.destination = [];
      state.radius = "";
      state.time = "";
      state.invitedFriendList = [];
      state.safacyBotMsg = [];
      state.originLocation = [];
      state.desLocation = [];
      state.userDestination = "";
    },
  },
  extraReducers: {
    [getCurrentSafacy.fulfilled]: (state, action) => {
      const {
        _id,
        user,
        publicMode,
        destination,
        time,
        radius,
        invitedFriendList,
        safacyBotMsg,
        originLocation,
        desLocation,
        userDestination,
      } = action.payload;

      state.id = _id;
      state.user = user;
      state.publicMode = publicMode;
      state.destination = destination;
      state.radius = radius;
      state.time = time;
      state.invitedFriendList = invitedFriendList;
      state.safacyBotMsg = safacyBotMsg;
      state.originLocation = originLocation;
      state.desLocation = desLocation;
      state.userDestination = userDestination;
      state.status = "success";
    },
    [updateSafacyMsg.fulfilled]: (state, action) => {
      state.safacyBotMsg = action.payload.safacyBotMsg;
      state.status = "success";
    },
    [updateDeslocation.fulfilled]: (state, action) => {
      state.status = "success";
    },
  },
});

export const { clearCurrentSafacy } = safacySlice.actions;
export default safacySlice.reducer;
