import { createBrowserHistory } from "history";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from "./App";
import "./i18nextInit";
import "./index.css";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
export const history = createBrowserHistory();

ReactDOM.render(
  <Suspense fallback="...">
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </Suspense>,
  document.getElementById("root")
);

reportWebVitals();
