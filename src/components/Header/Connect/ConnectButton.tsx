import "./ConnectButton.scss";
import arrowDown from "/images/arrowDown.png";

import { useAccount } from "wagmi";
import { useDisconnect } from "wagmi";

import { useState } from "react";
import ConnectPopUp from "./ConnectPopUp";

const ConnectButton = () => {
  const [isDropdown, setDropdown] = useState<boolean>(false);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      {showPopUp && <ConnectPopUp showPopUp={setShowPopUp} />}

      <div className="button-connect">
        {isConnected ? (
          <div className="button-text" onClick={() => setDropdown(!isDropdown)}>
            {address?.replace(address.substring(7, address.length - 5), "...")}
          </div>
        ) : (
          <>
            <div
              className="button-text"
              onClick={() => {
                setShowPopUp(true);
              }}
            >
              Connect
            </div>
            <div className="button-line" />
          </>
        )}

        <div
          className="button-div-icon"
          onClick={() => setDropdown(!isDropdown)}
        >
          <img className="button-icon-arrow" src={arrowDown} />
        </div>

        {isDropdown && (
          <div className="dropdown-connect">
            <div onClick={() => disconnect()}>Disconnect</div>
          </div>
        )}
      </div>
    </>
  );
};

export default ConnectButton;
