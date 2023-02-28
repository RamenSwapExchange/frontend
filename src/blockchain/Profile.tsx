import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import GetTotalSupply from "./GetTotalSupply";
import Mint from "./Mint";

import SwitchNetwork from "./SwitchNetwork";

function Profile() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <div>Connected to {connector?.name}</div>
        <div>{address}</div>
        <button onClick={disconnect as VoidFunction}>Disconnect</button>
        <SwitchNetwork />
        <GetTotalSupply />
        <Mint />
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}
export default Profile;
