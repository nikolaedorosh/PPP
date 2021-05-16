// import { useReducer } from 'react';
import { combineReducers } from "redux";
import graphicsReducer from "./graphicsReducers";
import foodReducer from "./foodReducer";
import useReducer from "./userReducer";
import infoReducer from "./infoReducer";

const rootReducer = combineReducers({
  info: infoReducer,
  graphics: graphicsReducer,
  auth: useReducer,
  food: foodReducer,
});

export default rootReducer;
