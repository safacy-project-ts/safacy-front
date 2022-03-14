import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    current: [],
    userDestination: [],
    count: 1,
  },
  reducers: {
    setCurrentLocation: (state, action) => {
      const { latitude, longitude } = action.payload;
      state.current = [latitude, longitude];
    },
    setUserDestination: (state, action) => {
      const { latitude, longitude } = action.payload;
      state.userDestination = [latitude, longitude];
    },
    clearDestination: (state, action) => {
      state.userDestination = [];
    },
    updateCount: (state, action) => {
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
