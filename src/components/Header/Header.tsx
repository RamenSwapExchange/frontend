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
import optimismIcon from "/images/Optymism.svg";
import arbitrumIcon from "/images/Arbitrum.svg";
import celoIcon from "/images/Celo.svg";

import { useAppDispatch } from "../../redux/hooks";
import { showPopUp } from "../../redux/appSlice";
import { Link } from "react-router-dom";
import ConnectButton from "./Connect/ConnectButton";

const Header = () => {
  const [dotsDropdownActive, setDotsDropdownActive] = useState<boolean>(false);
  const [chosenIcon, setChosenIcon] = useState<string>(ethereumIcon);
  const [chosenText, setChosenText] = useState<string>("Ethereum");
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

  function chooseOption(option: string) {
    switch (option) {
      case "ethereum":
        setChosenIcon(ethereumIcon);
        setChosenText("Ethereum");
        break;
      case "polygon":
        setChosenIcon(polygonIcon);
        setChosenText("Polygon");
        break;
      case "optimism":
        setChosenIcon(optimismIcon);
        setChosenText("Optimism");
        break;
      case "arbitrum":
        setChosenIcon(arbitrumIcon);
        setChosenText("Arbitrum");
        break;
      case "celo":
        setChosenIcon(celoIcon);
        setChosenText("Celo");
        break;
    }
  }

  return (
    <div className="header">
      <div className="header-left">
        <div className="logo">
          <MdOutlineRamenDining />
        </div>
        <AiOutlineSearch className="search-icon" />
        <Link to="/" className="link">
          Swap
        </Link>
        <Link to="/tokens" className="link">
          Tokens
        </Link>
        <Link to="/pool" className="link">
          Pool
        </Link>
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
              src={chosenIcon}
              alt="ethereum-icon"
              className="ethereum-icon"
            />
            <span>{chosenText}</span>
          </div>
          <ul
            className={
              ethereumDropdownActive
                ? "dropdown-menu dropdown-menu-active"
                : "dropdown-menu"
            }
          >
            <li
              className="dropdown-item li li-hover"
              onClick={() => chooseOption("ethereum")}
            >
              <img
                src={ethereumIcon}
                alt="ethereum-icon"
                className="ethereum-icon"
              />
              Ethereum
            </li>
            <li
              className="dropdown-item li li-hover"
              onClick={() => chooseOption("polygon")}
            >
              <img
                src={polygonIcon}
                alt="polygon-icon"
                className="ethereum-icon"
              />
              Polygon
            </li>
            <li
              className="dropdown-item li li-hover"
              onClick={() => chooseOption("optimism")}
            >
              <img
                src={optimismIcon}
                alt="optymism-icon"
                className="ethereum-icon"
              />
              Optimism
            </li>
            <li
              className="dropdown-item li li-hover"
              onClick={() => chooseOption("arbitrum")}
            >
              <img
                src={arbitrumIcon}
                alt="arbitrum-icon"
                className="ethereum-icon"
              />
              Arbitrum
            </li>
            <li
              className="dropdown-item li li-hover"
              onClick={() => chooseOption("celo")}
            >
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
