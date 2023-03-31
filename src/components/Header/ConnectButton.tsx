import "./ConnectButton.scss";

import { useAccount, useConnect } from "wagmi";
import { useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, error, isLoading } = useConnect({
    connector: new MetaMaskConnector({}),
  });

  return (
    <div
      onClick={() => {
        connect();
      }}
    >
      {isConnected
        ? address?.replace(address.substring(7, address.length - 5), "...")
        : "Connect"}
    </div>
  );
};

export default ConnectButton;
