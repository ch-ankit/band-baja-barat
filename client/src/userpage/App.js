import React from 'react';
import Header from './Header'
import './App.css';
import MiddlePart from './MiddlePart'
import Explore from './Explore'
import {BrowserRouter as Router,Route,Switch,withRouter} from 'react-router-dom'
import UserPage from "./UserPage"
import Invite from './invite/invite';
import ImageUpload from './ImageUpload';

function App() {
  return (
    <Router>
    <div className="App">
     
        <Switch>
          <Route path="/User" component={withRouter(ImageUpload)} />
          <Route path="/invite" component={Invite} />
          <Route exact path="/">
            <Header />
            {/*header*/}
            <MiddlePart />
            {/*middle page*/}
            <Explore />
            {/*explore*/}
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
