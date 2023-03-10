import "./header.scss";

import { MdOutlineRamenDining } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaScroll } from "react-icons/fa";
import {
  AiOutlineSearch,
  AiOutlineTwitter,
  AiFillGithub,
} from "react-icons/ai";
import { SiDiscord } from "react-icons/si";
import { useEffect, useState } from "react";
import { FiBarChart } from "react-icons/fi";
import ethereumIcon from "/images/Ethereum.png";
import polygonIcon from "/images/Polygon.svg";
import optymismIcon from "/images/Optymism.svg";
import arbitrumIcon from "/images/Arbitrum.svg";
import celoIcon from "/images/Celo.svg";

import ConnectButton from "./ConnectButton";

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
            <li className="dropdown-item li-hover">
              <FaScroll className="dropdown-icon" />
              Vote in governance
            </li>
            <li className="dropdown-item li-hover">
              <FiBarChart className="dropdown-icon" />
              View more analytics
            </li>
            <div className="border-bottom"></div>
            <li className="dropdown-item li-hover info-item">
              Help center &#8599;
            </li>
            <li className="dropdown-item li-hover info-item">
              Documentation &#8599;
            </li>
            <li className="dropdown-item li-hover info-item">
              Feedback &#8599;
            </li>
            <li className="dropdown-item li-hover info-item">
              Legal & Privacy &#8599;
            </li>
            <li className="dropdown-item li icon-item ">
              <SiDiscord style={{ margin: 0 }} />
              <AiOutlineTwitter />
              <AiFillGithub />
            </li>
          </ul>
        </div>

        <div className="dropdown" onClick={ethereumClicked}>
          <div className="ethereum-dropdown-box">
            <img
              src={ethereumIcon}
              alt="ethereum-icon"
              className="ethereum-icon"
            />
            <span>Ethereum</span>
          </div>
          <ul
            className={
              ethereumDropdownActive
                ? "dropdown-menu dropdown-menu-active"
                : "dropdown-menu"
            }
          >
            <li className="dropdown-item li li-hover">
              <img
                src={ethereumIcon}
                alt="ethereum-icon"
                className="ethereum-icon"
              />
              Ethereum
            </li>
            <li className="dropdown-item li li-hover">
              <img
                src={polygonIcon}
                alt="polygon-icon"
                className="ethereum-icon"
              />
              Polygon
            </li>
            <li className="dropdown-item li li-hover">
              <img
                src={optymismIcon}
                alt="optymism-icon"
                className="ethereum-icon"
              />
              Optimism
            </li>
            <li className="dropdown-item li li-hover">
              <img
                src={arbitrumIcon}
                alt="arbitrum-icon"
                className="ethereum-icon"
              />
              Arbitrum
            </li>
            <li className="dropdown-item li li-hover">
              <img src={celoIcon} alt="celo-icon" className="ethereum-icon" />
              Celo
            </li>
          </ul>
        </div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
