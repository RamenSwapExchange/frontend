import "./ChainsDropdown.scss";
import NavDropdown from "react-bootstrap/NavDropdown";
import { chainsWithIcons } from "../../blockchain/WagmiClient";
import { useNetwork, useSwitchNetwork } from "wagmi";

const ChainsDropdown = () => {
  const { isError, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork({
      onError() {},
      onSuccess() {},
    });
  const { chain, chains } = useNetwork();

  return (
    <NavDropdown title={"x"} id="basic-nav-dropdown" align="end">
      {chainsWithIcons.map((chain2) => {
        return (
          <NavDropdown.Item className="chain-main-div">
            <img src={chain2.icon} />
            <div>{chain2.name}</div>
            {chain?.id == chain2.id && <div>lol</div>}
          </NavDropdown.Item>
        );
      })}
    </NavDropdown>
  );
};

export default ChainsDropdown;
