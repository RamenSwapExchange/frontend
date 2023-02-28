import "./header.scss";
import { MdOutlineRamenDining } from "react-icons/md"
import { BiDotsHorizontalRounded } from "react-icons/bi"

const Header = () => {
  return <div className="header">
    <div className="header-left">
      <div className="logo"><MdOutlineRamenDining /></div>
      <a>Swap</a>
      <a>Tokens</a>
      <a>Pool</a>
    </div>
    <div className="header-mid">
      <input type="text" />
    </div>
    <div className="header-right">
      <div className="dots-icon"><BiDotsHorizontalRounded /></div>
      <div className="dropdown">Ethereum</div>
      <button>Connect</button>
    </div>
  </div>;
};

export default Header;
