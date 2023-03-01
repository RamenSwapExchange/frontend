import "./header.scss";
import { MdOutlineRamenDining } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <div className="logo">
          <MdOutlineRamenDining />
        </div>
        <AiOutlineSearch className="search-icon" />
        <a>Swap</a>
        <a>Tokens</a>
        <a>Pool</a>
      </div>
      <div className="header-mid">
        <input type="text" placeholder="Search tokens" />    
      </div>
      <div className="header-right">
        <div className="dropdown">
          <BiDotsHorizontalRounded className="dots-icon" />
          <ul className="dropdown-menu">
            <li className="dropdown-item li">Vote in governance</li>
            <li className="dropdown-item li">English</li>
          </ul>
        </div>

        <div className="ethereum-dropdown">
          <FaEthereum />
          <span>Ethereum</span>
        </div>
        <button>Connect</button>
      </div>
    </div>
  );
};

export default Header;
