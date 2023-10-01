import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import LoginProvider from "./context/AuthContext"; 
import { SoftUIControllerProvider } from "context";


import { Provider } from "react-redux";
import store from "../src/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}> 
    <LoginProvider>
      <BrowserRouter>
        <SoftUIControllerProvider>
          <App />
        </SoftUIControllerProvider>
      </BrowserRouter>
    </LoginProvider>
  </Provider>
);
