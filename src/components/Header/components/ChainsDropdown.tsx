import './chainsDropdown.scss'
import { NavDropdown, OverlayTrigger } from 'react-bootstrap'
import { BiError } from 'react-icons/bi'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'

import { chainsIcons, getChainIcon } from '../../../common/ChainsIcons'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { useRef, useState } from 'react'
import { watchNetwork } from '@wagmi/core'

const ChainsDropdown = () => {
    const { chain } = useNetwork()
    const { isConnected } = useAccount()
    const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork({
        onError() {
            setIsError(true)
        },
    })
    const [isError, setIsError] = useState(false)
    const [isArrowUp, setIsArrowUp] = useState(false)
    const dropdownRef = useRef(null)
    //state to change icon when user is not logged into MetaMask. Default ethereum icon
    const [icon, setIcon] = useState<string>(getChainIcon(1))

    //fires when user change net in MetaMask settings
    watchNetwork(() => {
        setIsError(false)
    })

    const ChangeChain = (chainId: number) => {
        switch (isConnected) {
            case true:
                setIsError(false)
                if (chain?.id == chainId) return
                switchNetwork!(chainId)
                break
            case false:
                setIcon(getChainIcon(chainId))
                break
        }
    }

    let TitleDropdown = (
        <div className="chain-button" ref={dropdownRef}>
            {isError && <BiError />}
            {isLoading && <div className="loader" />}

            <img
                className="chain-icon"
                src={isConnected ? (isLoading ? getChainIcon(pendingChainId!) : getChainIcon(chain?.id!)) : icon}
            />
            {isArrowUp ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
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
            {chainsIcons.map((chainMap, id) => {
                return (
                    <NavDropdown.Item key={id} className="chain-item-div" onClick={() => ChangeChain(chainMap.id)}>
                        <img className="chain-icon" src={chainMap.icon} />
                        <div>{chainMap.name}</div>
                        {chain?.id == chainMap.id && <div> ✔ </div>}
                    </NavDropdown.Item>
                )
            })}
        </NavDropdown>
    )
}

export default ChainsDropdown
