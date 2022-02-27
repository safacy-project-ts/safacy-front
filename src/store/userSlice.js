import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const signIn = createAsyncThunk('user/signIn', async () => {
  return axios
    .get('url')
    .then((res) => res.data)
    .catch((error) => error);
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    id: '',
    email: '',
    nickname: '',
  },
  reducers: {},
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = '';
    },
  },
});

export default usersSlice.reducer;
