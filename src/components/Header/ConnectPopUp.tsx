import "./connectPopUp.scss";

import { useAppDispatch } from "../../redux/hooks";
import { showPopUp } from "../../redux/appSlice";

import { Connector, useConnect } from "wagmi";

import { useState } from "react";

const ConnectPopUp = () => {
  const { connect, connectors, isLoading } = useConnect({
    onError(error) {
      setError(error);
    },
    onSuccess() {
      dispatch(showPopUp(false));
    },
  });
  const [error, setError] = useState<Error | false>(false);
  const dispatch = useAppDispatch();
  const [connector, setConnector] = useState<
    Connector<any, any, any> | undefined
  >(undefined);

  return (
    <div>
      <div className="background" onClick={() => dispatch(showPopUp(false))} />

      <div className="popUp-div">
        <div className="title-div">
          <div className="title-text"> Connect a wallet </div>
          <div
            className="cancel-button"
            onClick={() => dispatch(showPopUp(false))}
          >
            X
          </div>
        </div>

        {isLoading ? (
          <div className="loading-div">
            <span className="loader"></span>
            <b className="loading-text">Loading...</b>
          </div>
        ) : error ? (
          <div>
            <div> Error </div>
            <button onClick={() => connect({ connector })}> Try again </button>
            <button onClick={() => setError(false)}>
              Back to wallet selection
            </button>
          </div>
        ) : (
          connectors.map((connector) => (
            <button
              className="connector-button"
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => {
                setConnector(connector);
                connect({ connector });
              }}
            >
              {connector.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ConnectPopUp;
