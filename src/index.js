import React from "react";
import ReactDOM from "react-dom";
import Devtools from "mobx-react-devtools";
import { onPatch } from "mobx-state-tree";
import App from "./demo/components/App";
import IndexStore from "./demo/models/view";
import makeInspectable from "mobx-devtools-mst";

// console.log(user.id);
const indexStore = IndexStore.create();

// onPatch(book, patch => console.log(patch))
makeInspectable(indexStore);

ReactDOM.render(
  <div>
    <App store={indexStore} />
    {/* <Devtools /> */}
  </div>,
  document.getElementById("root")
);
