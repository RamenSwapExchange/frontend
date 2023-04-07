import "./ConnectButton.scss";
import Offcanvas from "react-bootstrap/Offcanvas";
import metaMaskLogo from "/images/MetaMaskLogo.svg";

import { useAccount, useConnect } from "wagmi";
import { useDisconnect } from "wagmi";
import { useState } from "react";
import ThemeButton from "./ThemeButton";

const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors, error, isLoading } = useConnect({
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
            {isConnected ? (
              <div onClick={() => disconnect()}>Disconnect</div>
            ) : (
              <div>
                <div className="connector-header">Connect a wallet</div>
                <div className="connectors">
                  {connectors.map((connector) => {
                    return (
                      <div
                        key={connector.id}
                        className="connector-div"
                        onClick={() => {
                          connect({ connector });
                        }}
                      >
                        <img
                          src={connector.name == "MetaMask" ? metaMaskLogo : ""}
                          className="connector-logo"
                        />
                        <div className="connector-name">{connector.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <ThemeButton />
          </div>
        </div>
      </Offcanvas>
    </>
  );
};

export default ConnectButton;
