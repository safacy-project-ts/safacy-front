import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCurrentSafacy = createAsyncThunk(
  "user/getCurrentSafacy",
  async (id: string) => {
    const safacy = await axios.get(
      `${process.env.REACT_APP_TEST_URI}/user/current/${id}`,
    );

    return safacy.data;
  },
);

export const updateSafacyMsg = createAsyncThunk(
  "safacy/updateSafacyMsg",
  async ({ id, message }: { id: string; message: string }) => {
    const updatedSafacyMsg = await axios.put(
      `${process.env.REACT_APP_TEST_URI}/safacy/${id}/message/update`,
      {
        message,
      },
    );

    return updatedSafacyMsg.data;
  },
);

export const updateOriginLocation = createAsyncThunk(
  "safacy/updateOriginLocation",
  async ({ id, location }: { id: string; location: string }) => {
    const updatedSafacyMsg = await axios.put(
      `${process.env.REACT_APP_TEST_URI}/safacy/${id}/location/update`,
      {
        location,
      },
    );

    return updateOriginLocation.data;
  },
);

export const updateDeslocation = createAsyncThunk(
  "safacy/updateDeslocation",
  async ({ id, deslocation }: { id: string; deslocation: string }) => {
    const updatedSafacyMsg = await axios.put(
      `${process.env.REACT_APP_TEST_URI}/safacy/${id}/deslocation/update`,
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
    radius: 0,
    time: "",
    invitedFriendList: [],
    safacyBotMsg: [],
    originLocation: [],
    desLocation: [],
    userDestination: [],
    status: "",
  },
  reducers: {
    clearCurrentSafacy: (state) => {
      state.id = "";
      state.user = "";
      state.destination = [];
      state.radius = 0;
      state.time = "";
      state.invitedFriendList = [];
      state.safacyBotMsg = [];
      state.originLocation = [];
      state.desLocation = [];
      state.userDestination = [];
    },
  },
  extraReducers: {
    [getCurrentSafacy.fulfilled]: (state, { payload }) => {
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
      } = payload;

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
    [updateSafacyMsg.fulfilled]: (state, { payload }) => {
      state.safacyBotMsg = payload.safacyBotMsg;
      state.status = "success";
    },
    [updateDeslocation.fulfilled]: (state, action) => {
      state.status = "success";
    },
  },
});

export const { clearCurrentSafacy } = safacySlice.actions;
export default safacySlice.reducer;
