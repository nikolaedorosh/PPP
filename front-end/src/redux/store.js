import rootReducer from './reducers/rootReduces'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from "redux";
import initState from "./initState";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, initState,composeWithDevTools(applyMiddleware(thunk)))


export default store;
