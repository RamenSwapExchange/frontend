import "./connectPopUp.scss";
import { BiErrorAlt } from "react-icons/bi";

import { useEffect } from "react";

import { useConnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

interface IConnectPopUp {
  showPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConnectPopUp = ({ showPopUp }: IConnectPopUp) => {
  const { connect, isLoading, isError, connectors } = useConnect({
    connector: new MetaMaskConnector({}),
    onSuccess() {
      showPopUp(false);
    },
  });

  useEffect(() => {
    connect();
    console.log("Loading: " + isLoading + " error: " + isError);
  }, []);

  return (
    <div className="popUp-main-div">
      <div className="background" onClick={() => showPopUp(false)} />

      <div className="popUp-div">

        <div className="title-div">
          <div className="cancel-button" onClick={() => showPopUp(false)}>
            X
          </div>
        </div>

        {isLoading ? (
          <div className="loading-div">
            <div className="loading-inDiv">
              <span className="loading-img"></span>
              <div className="loading-headear">Waiting to connect</div>
              <div className="loading-text">
                Confirm this connection in your wallet
              </div>
            </div>
          </div>
        ) : (
          isError && (
            <div className="error-div">
              <BiErrorAlt className="error-img" />
              <b>Error connecting</b>
              {connectors[0].ready ? (
                <>
                  <div className="error-text">
                    The connection attempt failed. Please click try again and
                    follow the steps to connect in your wallet.
                  </div>
                  <button className="error-tryAgain" onClick={() => connect()}>
                    Try again
                  </button>
                </>
              ) : (
                // metamask not found
                <>
                  <div className="error-text" />
                  <button
                    className="error-tryAgain"
                    onClick={() =>
                      window.open("https://metamask.io/", "_blank")
                    }
                  >
                    Install MetaMask
                  </button>
                </>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ConnectPopUp;
