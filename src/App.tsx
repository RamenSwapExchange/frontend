import { WagmiConfig } from "wagmi";
import client from "./blockchain/WagmiClient";
import Profile from "./blockchain/Profile";
import SwitchNetwork from "./blockchain/SwitchNetwork";
import GetTotalSupply from "./blockchain/contract functions/GetTotalSupply";
import Mint from "./blockchain/contract functions/Mint";

import "./index.scss";

const App = () => {
  return (
    <div>
      <WagmiConfig client={client}>
        <Profile />
        <SwitchNetwork />
        <GetTotalSupply />
        <Mint />
      </WagmiConfig>
    </div>
  );
}

export default App;
