import { combineReducers } from "redux";
import authReducer from "./userReducer";
import foodReducer from "./foodReducer";

export default combineReducers({
  auth: authReducer,
  meal: foodReducer
});
