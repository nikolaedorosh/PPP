import { createStore, applyMiddleware } from "redux";
import initState from "./initState";
import rootReducer from "./reducers/allReducers";

const store = createStore(rootReducer, initState );

export default store;
