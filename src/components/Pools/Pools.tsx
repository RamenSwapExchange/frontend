import "./pools.scss";
import Dropdown from "react-bootstrap/Dropdown";
import { AiOutlineContainer } from "react-icons/ai";
import { useAccount } from "wagmi";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAccountCanvas, showAccountCanvas } from "../../redux/appSlice";

const Pools = () => {
  const { isConnected } = useAccount();
  const showCanvas = useAppSelector(selectAccountCanvas);
  const dispatch = useAppDispatch();

  return (
    <div className="container-sm pools-container">
      <div className="pools-header">
        <div className="pools-title">Pools</div>
        <div className="pools-controls">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              More
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Migrate</Dropdown.Item>
              <Dropdown.Item>V2 liquidity</Dropdown.Item>
              <Dropdown.Item>Learn</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <button>+ New Position</button>
        </div>
      </div>
      <div className="liquidity-container">
        <AiOutlineContainer className="container-icon" />
        <div>Your active V3 liquidity positions will appear here.</div>

        {!isConnected && (
          <button
            onClick={() => dispatch(showAccountCanvas(!showCanvas))}
            className="pools-connect-btn"
          >
            Connect a wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Pools;
