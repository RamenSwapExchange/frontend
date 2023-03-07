import "./connectPopUp.scss";

import { useConnect } from "wagmi";
import { useAppDispatch } from "../../redux/hooks";
import { showPopUp } from "../../redux/appSlice";
import { polygonMumbai } from "wagmi/chains";
import { useState } from "react";

const ConnectPopUp = () => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({
      chainId: polygonMumbai.id,
    });
  const dispatch = useAppDispatch();
  const [connector, setConnector] = useState<any>(undefined);

  console.log(connectors[0]);

  return (
    <div>
      <div className="background" onClick={() => dispatch(showPopUp(false))} />
      <div className="popup">
        <div>
          <h4> Connect to Wallet </h4>
          <button onClick={() => dispatch(showPopUp(false))}> X </button>
        </div>
        <div>
          {isLoading && <b>{`Loading`}</b>}
          {error && (
            <div>
              <b>{`Error: ${error.message}`}</b>
              <button onClick={() => connect({ connector })}>try again</button>
            </div>
          )}
          {!isLoading &&
            !error &&
            connectors.map((connector) => (
              <div key={connector.id}>
                <button
                  disabled={!connector.ready}
                  onClick={() => {
                    setConnector(connector);
                    connect({ connector });
                  }}
                >
                  {connector.name}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectPopUp;
