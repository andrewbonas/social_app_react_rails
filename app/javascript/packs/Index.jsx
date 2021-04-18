import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Users from "./components/Users";


document.addEventListener("turbolinks:load", () => {
  const app = document.getElementById("app");
  const users = document.getElementById("users");

  app && ReactDOM.render(<App />, app);
  users && ReactDOM.render(<Users />, users);
});
