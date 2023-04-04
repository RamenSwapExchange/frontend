import "./pools.scss"
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlineContainer } from "react-icons/ai"

const Pools = () => {
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
                <button className="pools-connect-btn">Connect a wallet</button>
            </div>
        </div>
    )
}

export default Pools