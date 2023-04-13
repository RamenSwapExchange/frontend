import "./swap.scss";
import { FiSettings } from "react-icons/fi";
import { AiOutlineArrowDown } from "react-icons/ai";

import { useAppDispatch } from "../../redux/hooks";
import { showModal } from "../../redux/appSlice";
import TokensListModal from "./TokensListModal/TokensListModal";

const Swap = () => {

  const dispatch = useAppDispatch()
  const handleShow = () => dispatch(showModal(true));

  return (
    <div className="swap-container">
      <div className="swap-box">
        <div className="swap-top">
          <div>Swap</div>
          <div>
            <FiSettings className="settings-icon" />
          </div>
        </div>
        <div className="single-swap">
          <input type="text" placeholder="0" className="swap-input" />
          <button className="token-btn" onClick={handleShow}>
            MATIC
          </button>
        </div>
        <div className="single-swap">
          <input type="text" placeholder="0" className="swap-input" />
          <button className="token-btn" onClick={handleShow}>MATIC</button>
        </div>
        <button className="connect-button">Connect Wallet</button>
        <button className="swap-button">
          <AiOutlineArrowDown />
        </button>
      </div>
      <TokensListModal />
    </div>
  );
};

export default Swap;
