import './chainsDropdown.scss'
import { NavDropdown, OverlayTrigger } from 'react-bootstrap'
import { BiError } from 'react-icons/bi'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'

import { getChainIcon } from '../../../common/ChainsIcons'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { useState } from 'react'
import { watchNetwork } from '@wagmi/core'

const ChainsDropdown = () => {
    const { chain, chains } = useNetwork()
    const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork({
        onError() {
            setIsError(true)
        },
    })
    const [isError, setIsError] = useState(false)
    const [isArrowUp, setIsArrowUp] = useState(false)

    //fires when user change net in MetaMask settings
    watchNetwork(() => {
        setIsError(false)
    })

    const ChangeChain = (chainId: number) => {
        setIsError(false)
        if (chain?.id == chainId) return
        switchNetwork!(chainId)
    }

    let TitleDropdown = (
        <div className="chain-button">
            {isError && <BiError />}
            {isLoading && <div className="loader" />}

            <img
                className="chain-icon"
                src={isLoading ? getChainIcon(pendingChainId!) : getChainIcon(chain?.id!)}
            />
            {isArrowUp ? <RiArrowDropUpLine fontSize={20} /> : <RiArrowDropDownLine fontSize={20} />}
        </div>
    )

    if (chain?.unsupported) {
        TitleDropdown = (
            <OverlayTrigger
                placement="left"
                overlay={<div className="overlay-unsupported">Current network is unsupported.</div>}
            >
                {TitleDropdown}
            </OverlayTrigger>
        )
    }

    //TODO modal pop up on Error
    //https://react-bootstrap.github.io/components/modal/

    return (
        <NavDropdown
            title={TitleDropdown}
            className="chainDropdown-main"
            id="basic-nav-dropdown"
            align="end"
            onClick={() => setIsArrowUp(!isArrowUp)}
        >
            {chains.map((chainMap, id) => {
                return (
                    <NavDropdown.Item key={id} className="chain-item-div" onClick={() => ChangeChain(chainMap.id)}>
                        <img className="chain-icon" src={getChainIcon(chainMap.id)} />
                        <div>{chainMap.name}</div>
                        {chain?.id == chainMap.id && <div> ✔ </div>}
                    </NavDropdown.Item>
                )
            })}
        </NavDropdown>
    )
}

export default ChainsDropdown
