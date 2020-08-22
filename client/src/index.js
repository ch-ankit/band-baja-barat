import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import SignUp from "./SignUp";
import {Provider} from "react-redux"
import {Store} from './redux/store'
import Gallery from './Gallery';
import Dropdown from "./Dropdown.js";
import PartyDetail from "./PartyDetail.js";

ReactDOM.render(
  <Provider store={Store}>
  <StateProvider initialState={initialState} reducer={reducer}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StateProvider>
  </Provider>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
