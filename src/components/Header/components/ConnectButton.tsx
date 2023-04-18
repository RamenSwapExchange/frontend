import "./ConnectButton.scss";
import { useAccount } from "wagmi";

const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const addressSliced = address?.replace(
    address.substring(7, address.length - 5),
    "..."
  );

  //show canvas
  return (
    <div className="connect-button-main" onClick={() => {}}>
      {isConnected ? addressSliced : "Connect"}
    </div>
  );
};

export default ConnectButton;
