import "./Account.scss";
import { AiOutlinePoweroff } from "react-icons/ai";

import { useAccount, useBalance } from "wagmi";
import { useDisconnect } from "wagmi";

const Account = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data } = useBalance({
    address: address,
  });

  const addressSliced = address?.replace(
    address.substring(7, address.length - 5),
    "..."
  );

  return (
    <div>
      <div className="account-headear">
        <div className="account-address">{addressSliced}</div>
        <div className="account-disconnect" onClick={() => disconnect()}>
          <AiOutlinePoweroff />
        </div>
      </div>
      <div className="account-balance">
        {data?.formatted} {data?.symbol}
      </div>
    </div>
  );
};

export default Account;
