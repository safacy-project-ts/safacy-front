import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from '../api/axiosInstance';
import axios from 'axios';

export const signIn = createAsyncThunk(
  'user/signIn',
  async ({ email, nickname }) => {
    const user = await axios.post('http://localhost:8080/auth/signIn', {
      email,
      nickname,
    });
    return user.data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    email: null,
    nickname: null,
  },

  extraReducers: {
    [signIn.pending]: (state, action) => {
      state.status = 'loading...';
    },
    [signIn.fulfilled]: (state, action) => {
      const { id, email, nickname } = action.payload;
      state.id = id;
      state.email = email;
      state.nickname = nickname;
    },
    [signIn.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default userSlice.reducer;
