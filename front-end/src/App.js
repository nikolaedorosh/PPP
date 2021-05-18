import Header from "./components/Header/Header";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageNotFound from "./components/404/404";
import Logger from "./components/Logger/Logger";
import styles from "./app.module.css";
import List from "./components/List/List";
import BounceLoader from "react-spinners/BounceLoader";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import EditProfile from "./pages/EditProfile/EditProfile";
import Footer from "./components/Footer/Footer";
import ProfileModal from "./components/ProfileModal/ProfileModal";
import { useSelector } from "react-redux";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  const loading = useSelector((state) => state.loading);

  return (
    <>
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: 0.6,
            zIndex: 100,
          }}
        ></div>
      ) : (
        <></>
      )}
      <BrowserRouter>
        <div className={darkTheme ? styles.dark : styles.light}>
          <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <Switch>
            <Route exact path="/welcomepage" component={WelcomePage} />
            <Route exact path="/edit">
              <EditProfile />
            </Route>
            {/* <Route exact path='/profile'> */}
            {/* <ProfileContextProvider> */}
            {/* <ProfileModal /> */}
            {/* </ProfileContextProvider> */}
            {/* </Route> */}
            <Route exact path="/logger">
              <Logger />
              <List />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
