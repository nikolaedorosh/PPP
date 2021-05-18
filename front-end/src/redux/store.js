import MAIN from "./reducers/MAIN";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import initState from "./initState";
import { composeWithDevTools } from "redux-devtools-extension";
import watchAddLoad from "./saga";
import createSagaMiddleware from "redux-saga";
import { loadState, saveState } from "./actionCreators/localStorage";
import { useSelector } from "react-redux";

const sagaMiddleware = createSagaMiddleware();
// const isSignIn = useSelector((state) => state.auth.isSignedIn);

const store = createStore(
  MAIN,
  initState,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);

// store.subscribe(async () => {
//   console.log(initState.auth.isSignedIn);
//   if(initState.auth.isSignedIn) {
//     saveState({ auth: store.getState().auth })
//   }
//   // console.log("store auth", store.getState().auth);

//   // const localStor = await JSON.parse(localStorage.state)
//   // console.log(localStorage)
//   // if (localStor.auth.isSignedIn) {
//   //   console.log(localStorage.auth.isSignedIn)
//   //   loadState()
//   // } else {
//   //   saveState({ auth: store.getState().auth });
//   // }
//   // if
//   //   // localStorage.state.auth
//     // else if(JSON.parse(localStorage.state).auth.isSignedIn) {
//     // }
// });

sagaMiddleware.run(watchAddLoad);

export default store;
