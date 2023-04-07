import "./ChainsDropdown.scss";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BiError } from "react-icons/bi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

import { chainsWithIcons, getChainIcon } from "../../../blockchain/WagmiClient";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useState } from "react";
import { watchNetwork } from "@wagmi/core";

const ChainsDropdown = () => {
  const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork({
    onError() {
      setIsError(true);
    },
  });
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  //fires when user change net in MetaMask settings
  watchNetwork(() => {
    setIsError(false);
  });

  //state to change icon when user is not logged into MetaMask. Default ethereum icon
  const [icon, setIcon] = useState<string>(getChainIcon(1));
  const [isError, setIsError] = useState(false);
  const [isArrowUp, setIsArrowUp] = useState(false);

  const ChangeChain = (chainId: number) => {
    switch (isConnected) {
      case true:
        setIsError(false);
        if (chain?.id != chainId) switchNetwork!(chainId);
        break;
      case false:
        setIcon(getChainIcon(chainId));
        break;
    }
  };

  const TitleDropdown = (
    <div className="chain-button">
      {isError && <BiError />}
      {isLoading && <div className="loader" />}

      <img
        className="chain-icon"
        src={
          isConnected
            ? isLoading
              ? getChainIcon(pendingChainId!)
              : getChainIcon(chain?.id!)
            : icon
        }
      />
      {isArrowUp ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
    </div>
  );

  //TODO modal pop up on Error
  //https://react-bootstrap.github.io/components/modal/

  return (
    <NavDropdown
      title={TitleDropdown}
      className="chainDropdown-main"
      id="basic-nav-dropdown"
      align="end"
      onClick={() => setIsArrowUp(!isArrowUp)}
    >
      {chainsWithIcons.map((chainMap, id) => {
        return (
          <NavDropdown.Item
            key={id}
            className="chain-item-div"
            onClick={() => ChangeChain(chainMap.id)}
          >
            <img className="chain-icon" src={getChainIcon(chainMap.id)} />
            <div>{chainMap.name}</div>
            {chain?.id == chainMap.id && <div> ✔ </div>}
          </NavDropdown.Item>
        );
      })}
    </NavDropdown>
  );
};

export default ChainsDropdown;
