import { WagmiConfig } from "wagmi";
import client from "./blockchain/WagmiClient";
import Profile from "./blockchain/Profile";
import "./index.scss";

function App() {
  return (
    <div>
      <WagmiConfig client={client}>
        <Profile />
      </WagmiConfig>
    </div>
  );
}

export default App;
