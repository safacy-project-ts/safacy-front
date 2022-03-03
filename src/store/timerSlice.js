import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    initial: null,
    remaining: null,
  },
  reducers: {
    setTimer: (state, action) => {
      const { sec } = action.payload;
      console.log('sec', action.payload.sec);
      state.initial = sec;
      state.remaining = sec;
    },
    countDownTimer: (state, action) => {
      const prevRemaining = state.remaining;
      state.remaining = prevRemaining - 1;
    },
  },

  extraReducers: {},
});

export const { setTimer, countDownTimer } = timerSlice.actions;
export default timerSlice.reducer;
