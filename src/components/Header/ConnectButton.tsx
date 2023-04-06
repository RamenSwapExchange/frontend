import "./ConnectButton.scss";
import Offcanvas from "react-bootstrap/Offcanvas";

import { useAccount, useConnect } from "wagmi";
import { useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useState } from "react";

const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors, error, isLoading } = useConnect({
    connector: new MetaMaskConnector({}),
    onSuccess() {
      handleClose();
    },
  });

  const [showCanvas, setShowCanvas] = useState(false);
  const handleClose = () => setShowCanvas(false);
  const handleShow = () => setShowCanvas(true);

  return (
    <>
      <div className="connect-button-main" onClick={() => handleShow()}>
        {isConnected
          ? address?.replace(address.substring(7, address.length - 5), "...")
          : "Connect"}
      </div>

      <Offcanvas
        show={showCanvas}
        placement={"end"}
        backdrop={false}
        className="main-canvas"
      >
        <div className="main-div-canvas">
          <div className="left-panel" onClick={handleClose}>
            &gt;&gt;
          </div>
          <div className="right-panel">
            <div className="headear">
              <h4> Connect a wallet </h4>
              <button> settings </button>
            </div>
            <div>
              {connectors.map((connector) => {
                return (
                  <div
                    key={connector.id}
                    onClick={() => {
                      connect({ connector });
                    }}
                  >
                    {connector.name}
                  </div>
                );
              })}
            </div>
            <div>
              <div>Authors: qpa</div>
            </div>
          </div>
        </div>
      </Offcanvas>
    </>
  );
};

export default ConnectButton;
