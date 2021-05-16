import rootReducer from "./reducers/rootReduces";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import initState from "./initState"
import { composeWithDevTools } from 'redux-devtools-extension';
import watchAddLoad from './saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();


  const store = createStore(
    rootReducer, initState,
    composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
  );


  sagaMiddleware.run(watchAddLoad);


export default store;
