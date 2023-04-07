import "./ConnectButton.scss";
import Offcanvas from "react-bootstrap/Offcanvas";

import { useAccount } from "wagmi";
import { useState } from "react";

import ThemeButton from "./ThemeButton";
import ConnectorList from "./OffCanvasComponents/ConnectorList";
import Account from "./OffCanvasComponents/Account";

const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const addressSliced = address?.replace(
    address.substring(7, address.length - 5),
    "..."
  );

  const [showCanvas, setShowCanvas] = useState(false);
  const handleClose = () => setShowCanvas(false);
  const handleShow = () => setShowCanvas(true);

  return (
    <>
      <div className="connect-button-main" onClick={() => handleShow()}>
        {isConnected ? addressSliced : "Connect"}
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
              <Account />
            ) : (
              <ConnectorList onConnectAccount={handleClose} />
            )}

            <ThemeButton />
          </div>
        </div>
      </Offcanvas>
    </>
  );
};

export default ConnectButton;
