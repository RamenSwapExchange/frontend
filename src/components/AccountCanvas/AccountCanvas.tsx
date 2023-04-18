import "./AccountCanvas.scss";
import { Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { useAccount } from "wagmi";

import ThemeButton from "./CanvasComponents/ThemeButton";
import ConnectorList from "./CanvasComponents/ConnectorList";
import Account from "./CanvasComponents/Account";

const AccountCanvas = () => {
  const { isConnected } = useAccount();

  const [showCanvas, setShowCanvas] = useState(true);
  const handleClose = () => setShowCanvas(false);

  return (
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
  );
};

export default AccountCanvas;
