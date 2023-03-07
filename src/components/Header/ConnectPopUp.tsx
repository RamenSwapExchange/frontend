import "./connectPopUp.scss";

import { useConnect } from "wagmi";
import { useAppDispatch } from "../../redux/hooks";
import { showPopUp } from "../../redux/appSlice";

const ConnectPopUp = () => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const dispatch = useAppDispatch();

  console.log(connectors);

  return (
    <div>
      <div className="background" onClick={() => dispatch(showPopUp(false))}/>
      <div className="popup">
        {connectors.map((connector) => (
          <div key={connector.id}>
            <button
              disabled={!connector.ready}
              onClick={() => connect({ connector })}
            >
              {connector.name}
            </button>

            {isLoading && connector.id === pendingConnector?.id && (
              <div> connecting </div>
            )}
          </div>
        ))}

        {error && <b>{`Error: ${error.message}`}</b>}
      </div>
    </div>
  );
};

export default ConnectPopUp;
