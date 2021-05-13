import { createStore, applyMiddleware } from "redux";
import initState from "./initState";
import rootReducer from "./reducers/allReducers";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, initState , composeWithDevTools());

export default store;
