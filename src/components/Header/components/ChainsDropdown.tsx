import './chainsDropdown.scss'
import { NavDropdown, OverlayTrigger, ProgressBar } from 'react-bootstrap'
import { BiError } from 'react-icons/bi'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'
import errorIcon from "/error.png"

import { localChains, getChainIcon } from '../../../common/ChainsIcons'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { watchNetwork } from '@wagmi/core'
import { useState } from 'react'

const ChainsDropdown = () => {
    const polygonMumbaiId = 80001;
    const resetErrorTime = 15 * 1000; //seconds

    const { chain } = useNetwork()
    const { isConnected } = useAccount({
        onDisconnect() {
            setLocalChainId(chain?.id!)
            setIsError(false)
        },
    })
    const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork({
        onError() {
            setIsError(true)
            setTimeout(() => {
                setIsError(false)
            }, resetErrorTime);
        }
    })

    const [isArrowUp, setIsArrowUp] = useState(false)
    const [isError, setIsError] = useState(false);
    //fires when chain changed
    watchNetwork(() => {
        setIsError(false)
    })

    //state to change chain when user is not logged into MetaMask
    const [localChainId, setLocalChainId] = useState(polygonMumbaiId)

    const ChangeChain = (chainId: number) => {
        switch (isConnected) {
            case true:
                setIsError(false)
                if (chain?.id == chainId) return
                switchNetwork!(chainId)
                break
            case false:
                setLocalChainId(chainId)
                break
        }
    }

    let TitleDropdown = (
        <div className="chain-button">
            {isError && isConnected && <BiError />}
            {isLoading && <div className="loader" />}

            <img
                className="chain-icon"
                src={isLoading ? getChainIcon(pendingChainId!) : getChainIcon(isConnected ? chain?.id! : localChainId)}
            />
            {isArrowUp ? <RiArrowDropUpLine fontSize={20} /> : <RiArrowDropDownLine fontSize={20} />}
        </div>
    )

    if (chain?.unsupported) {
        TitleDropdown = (
            <OverlayTrigger
                placement="left"
                overlay={<div className="overlay-unsupported"> Current network is unsupported. </div>}
            >
                {TitleDropdown}
            </OverlayTrigger>
        )
    }

    return (
        <>
            <NavDropdown
                title={TitleDropdown}
                className="chainDropdown-main"
                id="basic-nav-dropdown"
                align="end"
                onClick={() => setIsArrowUp(!isArrowUp)}
            >
                {localChains.map((chainMap, id) => {
                    return (
                        <NavDropdown.Item key={id} className="chain-item-div" onClick={() => ChangeChain(chainMap.id)}>
                            <img className="chain-icon" src={getChainIcon(chainMap.id)} />
                            <div>{chainMap.name}</div>
                            {(isConnected ? chainMap.id == chain?.id! : chainMap.id == localChainId) && <div> ✔ </div>}
                        </NavDropdown.Item>
                    )
                })}
            </NavDropdown>

            {isError &&
                <div className='chains-error-container'>
                    <img src={errorIcon} alt="error" className='error-icon' />
                    <div className='error-text'>
                        Failed to switch networks.
                        <br /> Check MetaMask.
                    </div>
                    <button type="button" onClick={() => setIsError(false)} className="btn-close" aria-label="Close"></button>
                </div>
            }
        </>
    )
}

export default ChainsDropdown
