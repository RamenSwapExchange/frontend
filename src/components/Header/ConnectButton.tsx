import "./ConnectButton.scss";
import arrowDown from "./images/arrowDown.png";

import { useAppDispatch } from "../../redux/hooks";
import { showPopUp } from "../../redux/appSlice";

import { useAccount } from "wagmi";

const ConnectButton = () => {
  const dispatch = useAppDispatch();
  const { address } = useAccount();

  return (
    <>
      {address ? (
        <button>
          {address.replace(address.substring(7, address.length - 5), "...")}
        </button>
      ) : (
        <div className="button-connect">
          <div className="button-text" onClick={() => dispatch(showPopUp(true))}>Connect</div>
          <div className="button-line"/>
          <img className="button-arrowDown" src={arrowDown} />
        </div>
      )}
    </>
  );
};

export default ConnectButton;
