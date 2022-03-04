import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import safacyReducer from "./safacySlice";
import timerReducer from "./timerSlice";
import chatReducer from "./chatSlice";
import locationReducer from "./locationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    safacy: safacyReducer,
    timer: timerReducer,
    chat: chatReducer,
    location: locationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
