import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter,BrowserRouter } from "react-router-dom";
import App from "@/App";
import { Provider } from "react-redux";
import store from './store/store'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
