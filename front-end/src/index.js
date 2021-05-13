// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { Provider } from "react-redux";
// import "bootstrap/dist/css/bootstrap.min.css";
// import applicationStore from "./redux/store"

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={applicationStore}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { Provider } from "react-redux";
import applicationStore from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={applicationStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
