import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import authReducer from "../reducers/userReducer";
import foodReducer from "./foodReducer";
import graphicsReducers from "./graphicsReducers";

console.log(foodReducer);

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  meal: foodReducer,
  food: foodReducer,
  graphics: graphicsReducers,
});
