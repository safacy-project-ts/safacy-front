import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    message: [],
  },
  reducers: {
    sendMessage: (state, action) => {
      const { message } = action.payload;
      state.message.push(message);
    },
    clearMessage: (state, action) => {
      state.message = [];
    },
  },
  extraReducers: {},
});

export const { sendMessage, clearMessage } = chatSlice.actions;
export default chatSlice.reducer;
