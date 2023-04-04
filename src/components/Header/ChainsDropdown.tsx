import "./ChainsDropdown.scss";
import NavDropdown from "react-bootstrap/NavDropdown";
import { chainsWithIcons, getChainIcon } from "../../blockchain/WagmiClient";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useState } from "react";

const ChainsDropdown = () => {
  const { isError, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork({
      onError() {},
      onSuccess() {},
    });
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const [icon, setIcon] = useState<string>(getChainIcon(1));

  const ChangeChain = (chainId: number) => {
    setIcon(getChainIcon(chainId));

    if (isConnected) switchNetwork!(chainId);
  };

  const TitleDropdown = (
    <div
      className={
        isLoading ? "chain-button chain-button-loading" : "chain-button"
      }
    >
      {isLoading ? (
        <>
          <div className="loader" />
          <img className="chain-icon" src={getChainIcon(pendingChainId!)} />
        </>
      ) : (
        <img className="chain-icon" src={isConnected ? icon : getChainIcon(chain)} />
      )}
    </div>
  );

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
            {chain?.id == chainMap.id && <div>✔</div>}
          </NavDropdown.Item>
        );
      })}
    </NavDropdown>
  );
};

export default ChainsDropdown;
