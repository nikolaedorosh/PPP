// import { useReducer } from 'react';
import { combineReducers } from "redux";
import graphicsReducer from "./graphicsReducers";
import foodReducer from "./foodReducer";
import useReducer from "./userReducer";
import profileReducer from "./profileReducer";
import infoReducer from "./infoReducer";

const rootReducer = combineReducers({
  info: infoReducer,
  graphics: graphicsReducer,
  auth: useReducer,
  profile: profileReducer,
  food: foodReducer,
});

export default rootReducer;
