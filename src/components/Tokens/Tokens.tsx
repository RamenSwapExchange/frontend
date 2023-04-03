import "./tokens.scss";
import Dropdown from 'react-bootstrap/Dropdown';

const Tokens = () => {
    return (
        <div className="container-sm tokens-container">
            <div className="tokens-title">Top tokens on Ramenswap</div>
            <div className="filter-section">
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Ethereum
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>A</Dropdown.Item>
                        <Dropdown.Item>B</Dropdown.Item>
                        <Dropdown.Item>C</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        1D
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>A</Dropdown.Item>
                        <Dropdown.Item>B</Dropdown.Item>
                        <Dropdown.Item>C</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <input type="text" placeholder="Filter Tokens" />
            </div>
        </div>
    )
}

export default Tokens