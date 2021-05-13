import Header from "./components/Header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageNotFound from "./components/404/404";

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
          <Route exact path='/'>
            <p>profile</p>
          </Route>
          <Route exact path='/logger'>
            <p>logger</p>
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
