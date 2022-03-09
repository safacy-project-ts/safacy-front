import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    initial: 0,
    remaining: 0,
  },
  reducers: {
    setTimer: (state, action) => {
      const { sec } = action.payload;
      state.initial = sec;
      state.remaining = sec;
    },
    countDownTimer: (state, action) => {
      const prevRemaining = state.remaining;
      state.remaining = prevRemaining - 1;
    },
  },
});

export const { setTimer, countDownTimer } = timerSlice.actions;
export default timerSlice.reducer;
