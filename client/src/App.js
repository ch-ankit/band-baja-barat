import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import HeaderHome from './HeaderHome'
import Checkout from "./Checkout";
import Home from "./Home";
import Details from "./Details";
import MiddlePart from './MiddlePart'
import Explore from './Explore'
import UserPage from "./UserPage"
import Invite from './invite/invite';
import Party from "./Party"
import Band from "./Band"
import ImageUpload from './ImageUpload';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>

          {/* Routes from logins */}
          <Route path="/User" render={() => <UserPage />} />
          <Route path="/invite" render={() => <Invite />} />
          <Route exact path="/">
            <HeaderHome />
            {/*header*/}
            <MiddlePart />
            {/*middle page*/}
            <Explore />
            {/*explore*/}
          </Route>
          <Route path="/Party" component={Party} />
          <Route path="/Band" component={Band} />

          {/* Gift Store Routes */}
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
          <Route exact path="/giftstore" render={() => <Home />} />
          <Route path="/products/:modelNo" render={() => <Details />} />
        </Switch>
      </div>
    </Router >
  );
}

export default App;
