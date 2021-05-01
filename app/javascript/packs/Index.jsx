import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Switch } from 'react-router-dom'

import App from "./App";
import Users from "./components/Users";
import Profile from "./components/Profile";



document.addEventListener("turbolinks:load", () => {
  const app = document.getElementById("app");
  const users = document.getElementById("users");
  const user = document.getElementById("user");


  app && ReactDOM.render(<App />, app);
  users && ReactDOM.render(
    <Router>
      <Switch>
    <Route path="/users" component={Users}/>
    <Route path='/user/:id' component={Profile}/> 
    </Switch>
    </Router>, users
  );
});
