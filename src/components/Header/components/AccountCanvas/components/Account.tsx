import './account.scss'
import { AiOutlinePoweroff, AiOutlineCopy } from 'react-icons/ai'
import poolsImg from '/subpages/pools-subpage.png'
import tokensImg from '/subpages/tokens-subpage.png'

import { useAccount, useBalance } from 'wagmi'
import { useDisconnect } from 'wagmi'
import { useState } from 'react'

import Nav from 'react-bootstrap/Nav'
import ActivitySubpage from './AccountSubpages/ActivitySubpage/ActivitySubpage'
import AccountSubpage from './AccountSubpages/AccountSubpage/AccountSubpage'

const Account = () => {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data } = useBalance({
        address: address,
    })
    const [choosenPage, setChoosenPage] = useState<string | null>('tokens')

    const addressSliced = address?.replace(address.substring(7, address.length - 5), '...')

    const balanceSliced =
        data?.formatted.length! > 3 ? data?.formatted.replace(data.formatted.substring(7), '...') : data?.formatted

    let subpageContent = null
    if (choosenPage === 'tokens') {
        subpageContent = (
            <AccountSubpage
                title={'No tokens yet'}
                description={'Buy or transfer tokens to this wallet to get started.'}
                buttonText={'Explore tokens'}
                img_src={tokensImg}
                href="tokens"
            />
        )
    } else if (choosenPage === 'pools') {
        subpageContent = (
            <AccountSubpage
                title={'No pools yet'}
                description={'Open a new position or create a pool to get started.'}
                buttonText={'+ New position'}
                img_src={poolsImg}
                href="pools"
            />
        )
    } else if (choosenPage === 'activity') {
        subpageContent = <ActivitySubpage />
    }

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
                <div className="account-menu-content">{subpageContent}</div>
            </div>
        </>
    )
}

export default Account
