import Header from "./components/Header/Header";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageNotFound from "./components/404/404";
import SignUp from "./components/SignUp/SignUp";
import styles from "./app.module.css";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <>
      <BrowserRouter>
        <div className={darkTheme ? styles.dark : styles.light}>
          <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <Switch>
            <Route exact path='/signup' component={SignUp}/>
            <Route exact path='/signin'>
              <p>signin</p>
            </Route>
            <Route exact path='/'>
              <p>welcome page</p>
            </Route>
            <Route exact path='/profile'>
              <ProfilePage />
            </Route>
            <Route exact path='/logger'>
              <p>logger</p>
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
