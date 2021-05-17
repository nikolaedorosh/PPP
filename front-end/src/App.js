import Header from "./components/Header/Header";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageNotFound from "./components/404/404";
import Logger from "./components/Logger/Logger";
// import SignUp from "./components/SignUp/SignUp";
import styles from "./app.module.css";
import List from "./components/List/List";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import EditProfile from "./pages/EditProfile/EditProfile";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <>
      <BrowserRouter>
        <div className={darkTheme ? styles.dark : styles.light}>
          <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <Switch>
            <Route exact path="/welcomepage" component={WelcomePage} />
            <Route exact path="/edit">
              <EditProfile />
            </Route>
            <Route exact path="/profile">
              <p>HELLO</p>
            </Route>
            <Route exact path="/logger">
              <Logger />
              <List />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
