import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import foodReducer from "./foodReducer";
import authReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  meal: foodReducer,
});
