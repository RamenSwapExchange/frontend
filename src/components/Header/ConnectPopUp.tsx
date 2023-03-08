import "./connectPopUp.scss";

import { BiErrorAlt } from "react-icons/bi";

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
        <>
          <div className="title-div">
            <div className="title-text">
              {error ? "Error" : "Connect a wallet"}
            </div>
            <div
              className="cancel-button"
              onClick={() => dispatch(showPopUp(false))}
            >
              X
            </div>
          </div>
        </>
        {isLoading ? (
          <>
            <div className="loading-div">
              <span className="loading-img"></span>
              <b className="loading-text">Loading...</b>
            </div>
          </>
        ) : error ? (
          <>
            <div className="error-div">
              <BiErrorAlt className="error-img" />
              <button
                className="error-tryAgain"
                onClick={() => {
                  connect({ connector });
                  setError(false);
                }}
              >
                Try again
              </button>
              <div
                className="error-backToWallet"
                onClick={() => setError(false)}
              >
                Back to wallet selection
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="connectors-div">
              {connectors.map((connector) => (
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
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectPopUp;