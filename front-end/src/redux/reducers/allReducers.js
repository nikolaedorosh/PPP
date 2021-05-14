import { combineReducers } from "redux";
import authReducer from "../reducers/userReducer";

import foodReducer from "./foodReducer";
import graphicsReducers from './graphicsReducers'

console.log(foodReducer)

export default combineReducers({
  auth: authReducer,
  food: foodReducer,
  graphics: graphicsReducers,
});

