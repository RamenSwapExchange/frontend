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
        <input type="text" placeholder="Search tokens and NFT collections" />
      </div>
      <div className="header-right">
        <BiDotsHorizontalRounded className="dots-icon" />
        <div className="dropdown">
          <FaEthereum />
          <span>Ethereum</span>
        </div>
        <button>Connect</button>
      </div>
    </div>
  );
};

export default Header;
