import React from "react";
import ReactDOM from "react-dom";
import Devtools from "mobx-react-devtools";
// import { types, getSnapshot, applySnapshot, onSnapshot } from "mobx-state-tree";
// import { observer } from "mobx-react";
import store from "./todomvc/store";
import App from "./todomvc/App";

ReactDOM.render(
  <div>
    <Devtools />
    <App store={store} />
  </div>,
  document.getElementById("root")
);
