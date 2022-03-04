import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { BASE_URI, TEST_URI } from "@env";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, nickname }) => {
    const auth = await axios.post(`${TEST_URI}/auth/signIn`, {
      email,
      nickname,
    });

    return auth.data;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: null,
    email: null,
    nickname: null,
  },

  extraReducers: {
    [signIn.pending]: (state, action) => {
      state.status = "loading";
    },
    [signIn.fulfilled]: (state, action) => {
      const { id, email, nickname } = action.payload;
      state.id = id;
      state.email = email;
      state.nickname = nickname;
      state.status = "success";
    },
    [signIn.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default authSlice.reducer;
