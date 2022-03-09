// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { BASE_URI, TEST_URI } from "@env";

// export const getSafacyMsg = createAsyncThunk(
//   "safacy/getSafacyMsg",
//   async ({ id }) => {
//     const safacyMsg = await axios.get(`${TEST_URI}/safacy/${id}`);

//     return safacyMsg.data;
//   },
// );

// export const updateSafacyMsg = createAsyncThunk(
//   "safacy/updateSafacyMsg",
//   async ({ id, message }) => {
//     const updatedSafacyMsg = await axios.put(
//       `${TEST_URI}/safacy/${id}/update`,
//       {
//         message,
//       },
//     );

//     return updatedSafacyMsg.data;
//   },
// );

// const chatSlice = createSlice({
//   name: "chat",
//   initialState: {
//     message: [],
//   },
//   reducers: {
//     sendMessage: (state, action) => {
//       const { message } = action.payload;
//       state.message.push(message);
//     },
//     clearMessage: (state, action) => {
//       state.message = [];
//     },
//   },

//   extraReducers: {
//     [getSafacyMsg.pending]: (state, action) => {
//       state.status = "loading";
//     },
//     [getSafacyMsg.fulfilled]: (state, action) => {
//       state.message = action.payload;
//       state.status = "success";
//     },
//     [updateSafacyMsg.fulfilled]: (state, action) => {
//       state.status = "success";
//     },
//   },
// });

// export const { sendMessage, clearMessage } = chatSlice.actions;
// export default chatSlice.reducer;
