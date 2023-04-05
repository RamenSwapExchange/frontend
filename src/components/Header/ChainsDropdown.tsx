import "./ChainsDropdown.scss";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BiError } from "react-icons/bi";

import { chainsWithIcons, getChainIcon } from "../../blockchain/WagmiClient";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useState } from "react";
import { watchNetwork } from "@wagmi/core";

const ChainsDropdown = () => {
  const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork({
    onError() {
      setIsError(true);
    },
    onSuccess() {},
  });
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  //fires when user change net
  watchNetwork(() => {
    setIsError(false);
  });

  //state to change icon when user is not logged. Default ethereum icon
  const [icon, setIcon] = useState<string>(getChainIcon(1));
  const [isError, setIsError] = useState(false);

  const ChangeChain = (chainId: number) => {
    if (!isConnected) {
      setIcon(getChainIcon(chainId));
      return;
    }

    setIsError(false);
    if (chain?.id != chainId) switchNetwork!(chainId);
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
              : getChainIcon(chain?.id)
            : icon
        }
      />
    </div>
  );

  //TODO modal pop up
  //https://react-bootstrap.github.io/components/modal/

  return (
    <NavDropdown
      title={TitleDropdown}
      className="chainDropdown-main"
      id="basic-nav-dropdown"
      align="end"
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
