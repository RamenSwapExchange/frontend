import "./ConnectButton.scss";
import arrowDown from "./images/arrowDown.png";

import { useAppDispatch } from "../../redux/hooks";
import { showPopUp } from "../../redux/appSlice";

import { useAccount } from "wagmi";
import { useDisconnect } from "wagmi";

import { useState } from "react";

const ConnectButton = () => {
  const [isDropdown, setDropdown] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  return (
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
              dispatch(showPopUp(true));
            }}
          >
            Connect
          </div>
          <div className="button-line" />
        </>
      )}

      <div className="button-div-icon" onClick={() => setDropdown(!isDropdown)}>
        <img className="button-icon-arrow" src={arrowDown} />
      </div>

      {isDropdown && (
        <div className="dropdown-connect">
          <div onClick={() => disconnect()}>Disconnect</div>
        </div>
      )}
    </div>
  );
};

export default ConnectButton;
