import './tokens.scss'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table'
import useNet from '../../common/useNet'
import useNetIcon from '../../common/useNetIcon'
import { useEffect, useState } from 'react'
import { TokensType } from '../../redux/tokensModalSlice'
import tokensApi from '../../common/tokensApi'
import TableLoading from './TableLoading/TableLoading'

const Tokens = () => {
    const { nets } = useNet()
    const { getIcon } = useNetIcon()
    const [tokens, setTokens] = useState<TokensType[]>([])
    const [sortDirection, setSortDirection] = useState('asc')
    const [currentNetwork, setCurrentNetwork] = useState('Polygon Mumbai')
    const [tokensFilter, setTokensFilter] = useState('')
    const [tokensLoading, setTokensLoading] = useState(false)

    async function fetchTokens() {
        setTokensLoading(true)
        const res = await tokensApi.get(
            `/tokens?limit=100&sortBy=price&sortDirection=${sortDirection}&networks=${currentNetwork.toLowerCase()}&search=${tokensFilter}`
        )
        setTokens(res.data.tokens)
        setTokensLoading(false)
    }

    function sortTokens() {
        if (sortDirection === 'asc') {
            setSortDirection('desc')
        } else {
            setSortDirection('asc')
        }
    }

    function changeNetwork(netName: string) {
        setCurrentNetwork(netName)
        setTokensFilter('')
    }

    useEffect(() => {
        fetchTokens()
    }, [sortDirection, currentNetwork, tokensFilter])

    return (
        <div className="container-sm tokens-container">
            <div className="tokens-title">Tokens on Ramenswap</div>
            <div className="filter-section">
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="dropdown">
                        {currentNetwork}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {nets.map((net) => {
                            return (
                                <Dropdown.Item
                                    key={net.id}
                                    className="dropdown-net-row"
                                    onClick={() => changeNetwork(net.name)}
                                >
                                    <img className="net-icon" src={getIcon(net.id)} />
                                    {net.name}
                                </Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>

                <input
                    type="text"
                    placeholder="Filter Tokens"
                    value={tokensFilter}
                    onChange={(e) => setTokensFilter(e.target.value)}
                />
            </div>
            <Table className="tokens-table" hover>
                <thead>
                    <tr>
                        <th>
                            <span>#</span>
                        </th>
                        <th>
                            <span>Token name</span>
                        </th>
                        <th>
                            <span className="sort-by-span" onClick={sortTokens}>
                                Price
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tokensLoading ? (
                        <TableLoading />
                    ) : (
                        tokens.map((token: TokensType, id) => (
                            <tr key={id}>
                                <td className='token-id'>{id + 1}</td>
                                <td className="token-info">
                                    {token.images ? (
                                        <img src={token.images[1]} className="token-img"></img>
                                    ) : (
                                        <img src={token.image} className="token-img"></img>
                                    )}
                                    <div className="token-name">
                                        {token.name} <span className="token-symbol">{token.symbol}</span>
                                    </div>
                                </td>
                                <td className="token-price">${Math.ceil(token.price * 100) / 100}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Tokens
