import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import authReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
});
