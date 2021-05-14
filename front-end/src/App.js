import Header from "./components/Header/Header";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageNotFound from "./components/404/404";
import Logger from "./components/Logger/Logger";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/signup'>
            <p>signup</p>
          </Route>
          <Route exact path='/signin'>
            <p>signin</p>
          </Route>
          <Route exact path='/profile'>
            <p>profile</p>
          </Route>
          <Route exact path='/logger'>
            <Logger/>
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
