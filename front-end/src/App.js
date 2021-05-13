import Header from "./components/Header/Header";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageNotFound from "./components/404/404";
import styles from "./app.module.css";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import List from "./components/List/List";


function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className={darkTheme ? styles.dark : styles.light}>
    <BrowserRouter>
      <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <Switch>
        <Route exact path='/signup'>
          <p>signup</p>
        </Route>
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
          <List/>
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
