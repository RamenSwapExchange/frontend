import "./ConnectButton.scss";

import { useAccount } from "wagmi";
import { useDisconnect } from "wagmi";

const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return <>{isConnected ? { address } : "Connect"}</>;
};

export default ConnectButton;
