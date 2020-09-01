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
import AddProduct from "./AddProduct";
import SearchDisplay from "./SearchDisplay";
import { useStateValue } from "./StateProvider";
import UserInfo from "./UserInfo.js";
import Host from "./Host.js";

function App() {
  const [{ searchQuery }] = useStateValue();
  return (
    <Router>
      <div className="app">
        <Switch>

          {/* Routes from logins */}
          <Route exact path="/User" render={() => <UserPage />} />
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

          <Route path='/User/userInfo' component={UserInfo} />

          <Route path='/Host' component={Host} />
          {/*Sign up page */}
          <Route exact path='/Signup' component={SignUp} />
          {/* Gift Store Routes */}
          <Route path="/checkout">
            <div className="headerz"><Header /></div>
            <Checkout />
          </Route>
          <Route path="/addPoints">
            <h1>Payment page</h1>
          </Route>
          <Route path="/history">
            <div className="headerz"><Header /></div>
            <History />
          </Route>
          <Route path="/giftstore/products/details" render={(routeProps) => {
            return (
              <div>
                <div className="headerz"><Header /></div>
                <Details {...routeProps} />
              </div>
            )
          }} />
          <Route exact path="/giftstore" render={() => <Home />} />
          <Route exact path="/giftstore/product/add" render={() => <AddProduct />} />
          <Route exact path={`/giftstore/products/search`} render={(routeProps) => <SearchDisplay {...routeProps} />} />
        </Switch>
      </div>
    </Router >
  );
}

export default App;
