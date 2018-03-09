import React from "react";
import ReactDOM from "react-dom";
import Devtools from "mobx-react-devtools";
import { onPatch } from 'mobx-state-tree'
import App from './invoice/components/App';
import Invoice from './invoice/models/invoice'
import makeInspectable from 'mobx-devtools-mst';

const invoice = Invoice.create({currency: 'CAD'});

onPatch(invoice, patch => console.log(patch))
makeInspectable(invoice);

ReactDOM.render(
  <div>
    <App invoice={invoice}/>
    {/* <Devtools /> */}
  </div>,
  document.getElementById("root")
);