import "./connectorList.scss";
import metaMaskLogo from "/images/MetaMaskLogo.svg";
import Spinner from "react-bootstrap/Spinner";
import { useConnect } from "wagmi";

interface IConnectorList {
  onConnectAccount: () => void;
}
const ConnectorList = ({ onConnectAccount }: IConnectorList) => {
  const MetaMaskLink = "https://metamask.io/";
  
  const { connect, connectors, isLoading, pendingConnector } = useConnect({
    onSuccess() {
      onConnectAccount();
    },
  });

  return (
    <>
      <div className="connector-header">Connect a wallet</div>
      <div className="connectors">
        {connectors.map((connector) => {
          return (
            <div
              key={connector.id}
              className="connector-div"
              onClick={() => {
                connector.name == "MetaMask" && connector.ready
                  ? connect({ connector })
                  : window.open(MetaMaskLink, "_blank");
              }}
            >
              <img
                src={connector.name == "MetaMask" ? metaMaskLogo : ""}
                className="connector-logo"
              />
              <div className="connector-name"> {connector.name} </div>
              {isLoading && pendingConnector?.id === connector.id && (
                <Spinner animation="border" className="connector-spinner" />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ConnectorList;
