import "./AccountCanvas.scss";
import { Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { useAccount } from "wagmi";

import ThemeButton from "./CanvasComponents/ThemeButton";
import ConnectorList from "./CanvasComponents/ConnectorList";
import Account from "./CanvasComponents/Account";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAccountCanvas, showAccountCanvas } from "../../redux/appSlice";

const AccountCanvas = () => {
  const { isConnected } = useAccount();

  const handleClose = () => dispatch(showAccountCanvas(false));

  const showCanvas = useAppSelector(selectAccountCanvas);
  const dispatch = useAppDispatch();

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
