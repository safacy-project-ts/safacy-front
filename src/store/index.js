import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import safacyReducer from './safacySlice';
import timerReducer from './timerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    safacy: safacyReducer,
    timer: timerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
