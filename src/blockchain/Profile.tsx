import { useAccount, useConnect, useDisconnect } from "wagmi";

const Profile = () => {
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
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <div>
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {!connector.ready && " (unsupported)"}
          </button>

          {isLoading && connector.id === pendingConnector?.id && (
            <div> connecting </div>
          )}
        </div>
      ))}

      {error && <b>{`Error: ${error.message}`}</b>}
    </div>
  );
}
export default Profile;
