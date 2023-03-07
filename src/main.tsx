import "./index.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";


import { store } from "./redux/store";
import { Provider } from "react-redux";

import { WagmiConfig } from "wagmi";
import client from "./blockchain/WagmiClient";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </WagmiConfig>
  </React.StrictMode>
);
