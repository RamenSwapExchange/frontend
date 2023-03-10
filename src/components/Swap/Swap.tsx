import "./swap.scss";
import { FiSettings } from "react-icons/fi";
import { AiOutlineArrowDown } from "react-icons/ai";

const Swap = () => {
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
        </div>
        <div className="single-swap">
          <input type="text" placeholder="0" className="swap-input" />
        </div>
        <button className="connect-button">Connect Wallet</button>
        <button className="swap-button">
          <AiOutlineArrowDown />
        </button>
      </div>
    </div>
  );
};

export default Swap;
