import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

interface SignInProps {
  email: string;
  nickname: string;
}

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, nickname }: SignInProps) => {
    const auth = await axios.post(
      `${process.env.REACT_APP_TEST_URI}/auth/signIn`,
      {
        email,
        nickname,
      },
    );

    return auth.data;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: null,
    email: null,
    nickname: null,
    status: "",
  },

  extraReducers: {
    [signIn.pending]: (state, action) => {
      state.status = "loading";
    },
    [signIn.fulfilled]: (state, { payload }) => {
      const { id, email, nickname } = payload;
      state.id = id;
      state.email = email;
      state.nickname = nickname;
      state.status = "success";
    },
    [signIn.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
  reducers: undefined,
});

export default authSlice.reducer;
