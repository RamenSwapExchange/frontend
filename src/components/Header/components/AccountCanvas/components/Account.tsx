import './account.scss'
import { AiOutlinePoweroff, AiOutlineCopy } from 'react-icons/ai'

import { useAccount, useBalance } from 'wagmi'
import { useDisconnect } from 'wagmi'
import { useState } from 'react'

import Nav from 'react-bootstrap/Nav'

const Account = () => {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data } = useBalance({
        address: address,
    })
    const [choosenPage, setChoosenPage] = useState<string | null>('tokens')

    const addressSliced = address?.replace(address.substring(7, address.length - 5), '...')

    const balanceSliced = 
        data?.formatted.length! > 3 ? 
            data?.formatted.replace(data.formatted.substring(7), '...') 
            : data?.formatted

    return (
        <>
            <div className="account-header">
                <div className="account-address" onClick={() => navigator.clipboard.writeText(address!)}>
                    {addressSliced}
                    <AiOutlineCopy className="copy-icon" />
                </div>
                <div className="account-disconnect" onClick={() => disconnect()}>
                    <AiOutlinePoweroff />
                </div>
            </div>
            <div className="account-balance">
                {balanceSliced} {data?.symbol}
            </div>

            <div className="account-menu">
                <Nav
                    defaultActiveKey="tokens"
                    onSelect={(item) => setChoosenPage(item)}
                    className="account-menu-header"
                >
                    <Nav.Item>
                        <Nav.Link eventKey="tokens">Tokens</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="pools">Pools</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="activity">Activity</Nav.Link>
                    </Nav.Item>
                </Nav>
                <div className="account-menu-content">{choosenPage}</div>
            </div>
        </>
    )
}

export default Account
