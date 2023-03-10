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

  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      <div className="button-with-dropdown">
        <div className="button-connect">
          {address ? (
            <>
              {address.replace(address.substring(7, address.length - 5), "...")}
            </>
          ) : (
            <>
              <div
                className="button-text"
                onClick={() => dispatch(showPopUp(true))}
              >
                Connect
              </div>
            </>
          )}
          <div className="button-line" />
          <img
            className="button-arrowDown"
            src={arrowDown}
            onClick={() => setDropdown(!isDropdown)}
          />
        </div>
        {isDropdown && (
          <div className="dropdown-connect">
            dropdown
            <br />
            {address && <div onClick={() => disconnect()}>Disconnect</div>}
          </div>
        )}
      </div>
    </>
  );
};

export default ConnectButton;
