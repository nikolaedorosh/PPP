import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import authReducer from "../reducers/userReducer";
import foodReducer from "./foodReducer";
import graphicsReducers from "./graphicsReducers";
import infoReducer from "./infoReducer";

export default combineReducers({
  info: infoReducer,
  auth: authReducer,
  profile: profileReducer,
  meal: foodReducer,
  food: foodReducer,
  graphics: graphicsReducers,
});
