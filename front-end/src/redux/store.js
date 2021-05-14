import rootReducer from './reducers/rootReduces'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from "redux";
import initState from "./initState"
import { composeWithDevTools } from 'redux-devtools-extension';


// import api from '../middleware/api'
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../redux/reducers/allReducers";

// const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer, initState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  export default store;
// };

// export default st();



