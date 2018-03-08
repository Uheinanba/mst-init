import React from "react";
import ReactDOM from "react-dom";
import Devtools from "mobx-react-devtools";
import { onSnapshot, getSnapshot, addMiddleware } from 'mobx-state-tree';

import "./assets/index.css"
import App from './wishlist/components/App'
import { Group } from './wishlist/models/Group'

let initState = {
  "users": {}
};

let group = window.group = Group.create(initState)

addMiddleware(group, (call, next) => {
  console.log(`[${call.type}] ${call.name}`)
  next();
})

function renderApp() {
  ReactDOM.render(
    <div>
      <Devtools />
      <App group={group}/>
    </div>,
    document.getElementById("root")
  );
}

renderApp();

if(module.hot) {
  module.hot.accept(["./wishlist/components/App"], () => {
      // new components
      renderApp()
  })

  module.hot.accept(["./wishlist/models/Group"], () => {
      // new model definitions
      const snapshot = getSnapshot(Group)
      group = window.group = Group.create(snapshot)
      renderApp()
  })
}


