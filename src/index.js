import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "nprogress/nprogress.css";
import { enableES5 } from "immer";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import { configureStore } from "./store";

import App from "./App";

enableES5();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
