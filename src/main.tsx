import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { WagmiConfig } from "wagmi";
import client from "./blockchain/WagmiClient";

import "./index.scss";

import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </WagmiConfig>
  </React.StrictMode>
);
