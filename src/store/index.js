import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import safacyReducer from './safacySlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    safacy: safacyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
