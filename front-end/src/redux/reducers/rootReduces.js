import { combineReducers } from 'redux';
import graphicsReducer from './graphicsReducers'

const rootReducer = combineReducers({
  graphics: graphicsReducer
});

export default rootReducer;


