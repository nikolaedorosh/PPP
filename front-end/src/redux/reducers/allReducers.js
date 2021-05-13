import { combineReducers } from "redux";
import authReducer from "../reducers/userReducer";

export default combineReducers({
  auth: authReducer,
});

