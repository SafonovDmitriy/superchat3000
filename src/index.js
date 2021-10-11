import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { IntercomProvider } from "react-use-intercom";
import App from "./App";
import "./i18nextInit";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
export const history = createBrowserHistory();
const INTERCOM_APP_ID = "mhc9c3xu";
ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
