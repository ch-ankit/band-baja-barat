import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Checkout from "./Checkout";
import Home from "./Home";
import Details from "./Details";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/addPoints">
            <h1>Payment page</h1>
          </Route>
          <Route path="/history">
            <h1>History Page</h1>
          </Route>
          <Route path="/details">
            <Header />
            <Details />
          </Route>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/products/:modelNo" render={() => <Details />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
