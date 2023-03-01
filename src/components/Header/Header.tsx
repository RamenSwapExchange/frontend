import "./header.scss";
import { MdOutlineRamenDining } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaEthereum, FaScroll } from "react-icons/fa";
import {
  AiOutlineSearch,
  AiOutlineTwitter,
  AiFillGithub,
} from "react-icons/ai";
import { SiDiscord } from "react-icons/si";
import { useState } from "react";

const Header = () => {
  const [dotsDropdownActive, setDotsDropdownActive] = useState<boolean>(false);
  const [ethereumDropdownActive, setEthereumDropdownActive] =
    useState<boolean>(false);

  function dotsClicked() {
    setDotsDropdownActive(!dotsDropdownActive);
    setEthereumDropdownActive(false);
  }

  function ethereumClicked() {
    setEthereumDropdownActive(!ethereumDropdownActive);
    setDotsDropdownActive(false);
  }

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
        <div className="dropdown" onClick={dotsClicked}>
          <BiDotsHorizontalRounded className="dots-icon" />
          <ul
            className={
              dotsDropdownActive
                ? "dropdown-menu dropdown-menu-active"
                : "dropdown-menu"
            }
          >
            <li className="dropdown-item li">Vote in governance</li>
            <li className="dropdown-item li">View more analytics</li>
            <li className="dropdown-item li info-item">Help center</li>
            <li className="dropdown-item li info-item">Documentation</li>
            <li className="dropdown-item li info-item">Feedback</li>
            <li className="dropdown-item li info-item">Legal & Privacy</li>
            <li className="dropdown-item li icon-item ">
              <SiDiscord style={{ margin: 0 }} />
              <AiOutlineTwitter />
              <AiFillGithub />
            </li>
          </ul>
        </div>

        <div className="dropdown" onClick={ethereumClicked}>
          <FaEthereum className="dots-icon" />
          <span>Ethereum</span>
          <ul
            className={
              ethereumDropdownActive
                ? "dropdown-menu dropdown-menu-active"
                : "dropdown-menu"
            }
          >
            <li className="dropdown-item li">Ethereum</li>
            <li className="dropdown-item li">Polygon</li>
            <li className="dropdown-item li">Optimism</li>
            <li className="dropdown-item li">Arbitrum</li>
            <li className="dropdown-item li">Celo</li>
          </ul>
        </div>

        <button>Connect</button>
      </div>
    </div>
  );
};

export default Header;
