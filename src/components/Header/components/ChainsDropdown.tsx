import './chainsDropdown.scss'
import { NavDropdown, OverlayTrigger } from 'react-bootstrap'
import { BiError } from 'react-icons/bi'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'
import errorIcon from '/error.png'

import { useAccount } from 'wagmi'
import { watchNetwork } from '@wagmi/core'
import { useState } from 'react'

import useNet from '../../../common/useNet'
import useNetIcon from '../../../common/useNetIcon'

const ChainsDropdown = () => {
    const resetErrorTime = 15 * 1000 //seconds

    const { netId, nets, unsupported, changeOfflineNet, changeNet } = useNet({
        onErrorChangeNet() {
            setIsError(true)
            setTimeout(() => {
                setIsError(false)
            }, resetErrorTime)
        },
    })
    const { isLoading, pendingChainId, switchNetwork } = changeNet
    const { getIcon } = useNetIcon()

    const { isConnected } = useAccount({
        onDisconnect() {
            if (unsupported) changeOfflineNet(nets[0].id)
            else changeOfflineNet(netId)

            setIsError(false)
        },
    })

    const [isArrowUp, setIsArrowUp] = useState(false)
    const [isError, setIsError] = useState(false)

    //fires when chain changed
    watchNetwork(() => {
        setIsError(false)
    })

    function ChangeChain(id: number) {
        switch (isConnected) {
            case true:
                setIsError(false)
                if (netId == id)
                    return
                switchNetwork!(id)
                break
            case false:
                changeOfflineNet(id)
                break
        }
    }

    let TitleDropdown = (
        <div className="chain-button">
            {isError && <BiError />}
            {isLoading && <div className="loader" />}

            <img className="chain-icon" src={getIcon(isLoading ? pendingChainId! : netId)} />
            {isArrowUp ? (
                <RiArrowDropUpLine fontSize={20} className="arrow-icon" />
            ) : (
                <RiArrowDropDownLine fontSize={20} className="arrow-icon" />
            )}
        </div>
    )

    if (unsupported) {
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
                {nets.map((net) => {
                    return (
                        <NavDropdown.Item
                            key={net.id}
                            className="chain-item-div"
                            onClick={() => {
                                ChangeChain(net.id)
                            }}
                        >
                            <img className="chain-icon" src={getIcon(net.id)} />
                            <div> {net.name} </div>
                            {net.id == netId && <div> ✔ </div>}
                        </NavDropdown.Item>
                    )
                })}
            </NavDropdown>

            {isError && (
                <div className="chains-error-container">
                    <img src={errorIcon} alt="error" className="error-icon" />
                    <div className="error-text">
                        Failed to switch networks.
                        <br /> Check MetaMask.
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsError(false)}
                        className="btn-close"
                        aria-label="Close"
                    ></button>
                </div>
            )}
        </>
    )
}

export default ChainsDropdown
