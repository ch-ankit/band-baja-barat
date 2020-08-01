import React, { Component } from 'react';
import './App.css'
import { Switch, Route, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Store from './Store'
import AdminStore from './AdminStore'
import axios from 'axios'

class App extends Component {
  getApi = () => {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch(error => {
        return error;
      });



  }
  sendData = () => {
    const fruits = ['🥭', '🍎', '🍏', '🍅', '🍇', '🍈', '🍉', '🍊'];
    axios.post('http://localhost:5000/postReq', { fruits }).then((data) => { console.log(data) })
  }
  componentDidMount() {
    this.getApi();
  }
  render() {
    this.sendData();
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => <div> <Link to='/store'>  <Button variant="primary">Store!</Button></Link><Link to='/adminStore'>  <Button variant="primary">Admin Add!</Button></Link></div>} />
          <Route exact path='/store' render={(routeProps) => <Store isAdmin={false} />} />
          <Route exact path='/adminStore' render={(routeProps) => <AdminStore />} />
        </Switch>
        <Button>Hello</Button>

      </div>
    );
  }
}

export default App;
