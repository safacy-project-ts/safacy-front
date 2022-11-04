import { combineReducers } from "redux";

import authReducer from "./authSlice";
import userReducer from "./userSlice";
import safacyReducer from "./safacySlice";
import timerReducer from "./timerSlice";
import locationReducer from "./locationSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  safacy: safacyReducer,
  timer: timerReducer,
  location: locationReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
