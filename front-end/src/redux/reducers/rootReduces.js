// import { useReducer } from 'react';
import { combineReducers } from "redux";
import graphicsReducer from "./graphicsReducers";
import foodReducer from "./foodReducer";
import useReducer from "./userReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  graphics: graphicsReducer,
  auth: useReducer,
  meal: foodReducer,
  profile: profileReducer,
});

export default rootReducer;
