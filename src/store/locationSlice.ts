import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    current: [],
    userDestination: [],
    count: 1,
  },
  reducers: {
    setCurrentLocation: (state, { payload }) => {
      const { latitude, longitude } = payload;
      state.current = [latitude, longitude];
    },
    setUserDestination: (state, { payload }) => {
      const { latitude, longitude } = payload;
      state.userDestination = [latitude, longitude];
    },
    clearDestination: (state) => {
      state.userDestination = [];
    },
    updateCount: (state) => {
      state.count += 1;
    },
  },
  extraReducers: {},
});

export const {
  setCurrentLocation,
  setUserDestination,
  clearDestination,
  updateCount,
} = locationSlice.actions;
export default locationSlice.reducer;
