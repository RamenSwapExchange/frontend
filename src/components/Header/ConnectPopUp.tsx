import "./connectPopUp.scss";

import { BiErrorAlt } from "react-icons/bi";
import logoMetaMask from "./images/logoMetaMask.png";

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

  const connectorOnClick = () => {
    //TODO
  };

  return (
    <div>
      <div className="background" onClick={() => dispatch(showPopUp(false))} />

      <div className="popUp-div">
        <>
          <div className="title-div">
            <div className="title-text">
              {isLoading || error ? "" : "Connect a wallet"}
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
              <div className="loading-inDiv">
                <span className="loading-img"></span>
                <div className="loading-headear">Waiting to connect</div>
                <div className="loading-text">
                  Confirm this connection in your wallet
                </div>
              </div>
            </div>
          </>
        ) : error ? (
          <>
            <div className="error-div">
              <BiErrorAlt className="error-img" />
              <b>Error connecting</b>
              <div className="error-text">
                The connection attempt failed. Please click try again and follow
                the steps to connect in your wallet.
              </div>
              <button
                className="error-tryAgain"
                onClick={() => connectorOnClick()}
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
                  key={connector.id}
                  onClick={() => {
                    setConnector(connector);
                    connect({ connector });
                  }}
                >
                  <img
                    className="connector-logo"
                    src={connector.name == "MetaMask" ? logoMetaMask : ""}
                  />
                  <div className="connector-text">
                    {!connector.ready && "Install "} {connector.name}
                  </div>
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
