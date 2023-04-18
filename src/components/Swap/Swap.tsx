import "./swap.scss";
import { FiSettings } from "react-icons/fi";
import { AiOutlineArrowDown } from "react-icons/ai";
import TokensListModal from "./TokensListModal/TokensListModal";
import ethereumIcon from "/images/Ethereum.png";
import { useAccount } from "wagmi";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAccountCanvas, showAccountCanvas, showModal } from "../../redux/appSlice";

const Swap = () => {
  const { isConnected } = useAccount();
  const dispatch = useAppDispatch();
  const handleShow = () => dispatch(showModal(true));

  const isCanvas = useAppSelector(selectAccountCanvas);
  const handleShowAccount = () => dispatch(showAccountCanvas(!isCanvas));
  
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
            <img src={ethereumIcon} alt={ethereumIcon} /> ETH
            <div className="arrow-down">&#x25BC;</div>
          </button>
        </div>
        <div className="single-swap">
          <input type="text" placeholder="0" className="swap-input" />
          <button className="token-btn" onClick={handleShow}>
            <img src={ethereumIcon} alt={ethereumIcon} /> ETH
            <div className="arrow-down">&#x25BC;</div>
          </button>
        </div>

        {isConnected ? (
          <button className="connect-button">Select a token</button>
        ) : (
          <button className="connect-button" onClick={() => {handleShowAccount()}}>
            Connect Wallet
          </button>
        )}
        <button className="swap-button">
          <AiOutlineArrowDown />
        </button>
      </div>
      <TokensListModal />
    </div>
  );
};

export default Swap;
