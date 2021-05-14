import { combineReducers } from "redux";
import foodReducer from "./foodReducer";
import authReducer from "./userReducer";
import graphicsReducers from './graphicsReducers'
export default combineReducers({
  auth: authReducer,
  meal: foodReducer,
  graphics: graphicsReducers,
});
