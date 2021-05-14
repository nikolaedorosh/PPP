// import { useReducer } from 'react';
import { combineReducers } from 'redux';
import graphicsReducer from './graphicsReducers'
import foodReducer from './foodReducer'
import useReducer from './userReducer'

const rootReducer = combineReducers({
  graphics: graphicsReducer,
  auth: useReducer,
  meal: foodReducer
});

export default rootReducer;


