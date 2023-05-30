import './swap.scss'
import { FiSettings } from 'react-icons/fi'
import { AiOutlineArrowDown } from 'react-icons/ai'

import SingleSwap from './SingleSwap'

import { useLocation } from "react-router-dom";
import { useAccount } from 'wagmi'
import useNet from '../../common/useNet'
import { selectChoosenTokens, swapTokens } from '../../redux/tokensSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAccountCanvas, showAccountCanvas } from '../../redux/appSlice'

const Swap = () => {
    const location = useLocation();
    const { isConnected } = useAccount()
    const { unsupported } = useNet()
    const dispatch = useAppDispatch()
    const isCanvas = useAppSelector(selectAccountCanvas)
    const choosenToknes = useAppSelector(selectChoosenTokens)

    function handleShowAccount() {
        dispatch(showAccountCanvas(!isCanvas))
    }
    function swapButtons() {
        dispatch(swapTokens())
    }

    return (
        <>
            <div className={location.pathname === "/swap" ? "swap-box swap-margin" : "swap-box"}>
                <div className="swap-top">
                    <div>Swap</div>
                    <div>
                        <FiSettings className="settings-icon" />
                    </div>
                </div>

                <SingleSwap disabled={unsupported} id={0} />
                <SingleSwap disabled={unsupported} id={1} />

                <button
                    className={unsupported ? 'swap-button swap-button-disabled' : 'swap-button'}
                    onClick={swapButtons}
                >
                    <AiOutlineArrowDown className="arrow-down" />
                </button>
                {isConnected ? (
                    choosenToknes.includes(null!) ? (
                        <button className={unsupported ? 'connect-button connect-button-disabled' : 'connect-button'}>
                            Select a token
                        </button>
                    ) : (
                        <button className={unsupported ? 'connect-button connect-button-disabled' : 'connect-button'}>
                            Swap
                        </button>
                    )
                ) : (
                    <button className="connect-button" onClick={handleShowAccount}>
                        Connect Wallet
                    </button>
                )}
            </div>
        </>
    )
}

export default Swap
