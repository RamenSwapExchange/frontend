import "./swap.scss";
import { FiSettings } from "react-icons/fi"

const Swap = () => {
  return <div className="swap-container">
    <div className="swap-box">
      <div className="swap-top">
        <div>Swap</div>
        <div><FiSettings className="settings-icon" /></div>
      </div>
      <div className="single-swap">
        <input type="text" placeholder="0" className="swap-input" />
      </div>

    </div>
  </div>;
};

export default Swap;
