import { combineReducers } from "redux";
import foodReducer from "./foodReducer";
import authReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  meal: foodReducer
});
