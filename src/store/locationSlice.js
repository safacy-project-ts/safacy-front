import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    current: [],
    userDestination: [],
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
  },
  extraReducers: {},
});

export const { setCurrentLocation, setUserDestination, clearDestination } =
  locationSlice.actions;
export default locationSlice.reducer;
