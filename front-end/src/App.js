import Header from "./components/Header/Header";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageNotFound from "./components/404/404";
import Logger from "./components/Logger/Logger";
import SignUp from "./components/SignUp/SignUp";
import styles from "./app.module.css";
import List from "./components/List/List";
import ProfileContextProvider from "../src/context/profileContext";
import EditProfile from "./pages/EditProfile/EditProfile";
import ProfileModal from "./components/ProfileModal/ProfileModal";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <>
      <BrowserRouter>
        <div className={darkTheme ? styles.dark : styles.light}>
          <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <Switch>
            <Route exact path='/' component={SignUp} />
            <Route exact path='/edit'>
              <EditProfile />
            </Route>
            <Route exact path='/profile'>
              {/* <ProfileContextProvider> */}
              <ProfileModal />
              {/* </ProfileContextProvider> */}
            </Route>
            <Route exact path='/logger'>
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
