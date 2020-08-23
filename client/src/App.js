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
import SignUp from './SignUp.js'
import PartyDetail from "./PartyDetail.js";
import BandDetail from "./BandDetail.js";
import History from "./History";

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
          <Route path='/bands/:band' children={<BandDetail />} />
          <Route exact path='/partypalace/:party' children={<PartyDetail />} />
         
          {/*Sign up page */}
          <Route exact path='/Signup' component={SignUp} />
          {/* Gift Store Routes */}
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/addPoints">
            <h1>Payment page</h1>
          </Route>
          <Route path="/history">
            <History />
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
