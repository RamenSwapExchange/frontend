import './tokens.scss'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table'
import { useAccount, useNetwork } from 'wagmi'
import useCurrentNet from '../../common/useCurrentNet'

const Tokens = () => {
    const { net, offlineNets } = useCurrentNet()

    return (
        <div className="container-sm tokens-container">
            <div className="tokens-title">Top tokens on Ramenswap</div>
            <div className="filter-section">
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="dropdown">
                        ETHEREUM
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {offlineNets.map((net) => {
                            return <Dropdown.Item key={net.id}>{net.name}</Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="dropdown">
                        1D
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>1H</Dropdown.Item>
                        <Dropdown.Item>1D</Dropdown.Item>
                        <Dropdown.Item>1W</Dropdown.Item>
                        <Dropdown.Item>1M</Dropdown.Item>
                        <Dropdown.Item>1Y</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <input type="text" placeholder="Filter Tokens" />
            </div>
            <Table className="tokens-table" hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Token name</th>
                        <th>Price</th>
                        <th>Change</th>
                        <th>TVL</th>
                        <th>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Example</td>
                        <td>Example</td>
                        <td>Example</td>
                        <td>Example</td>
                        <td>Example</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Example</td>
                        <td>Example</td>
                        <td>Example</td>
                        <td>Example</td>
                        <td>Example</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Tokens
