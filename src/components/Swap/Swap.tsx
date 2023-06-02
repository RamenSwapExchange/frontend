import './swap.scss'
import { FiSettings } from 'react-icons/fi'
import { AiOutlineArrowDown } from 'react-icons/ai'

import SingleSwap from './SingleSwap'

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAccount } from 'wagmi'
import useNet from '../../common/useNet'
import { selectChoosenTokens, selectInputValue, swapTokens } from '../../redux/tokensSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAccountCanvas, showAccountCanvas } from '../../redux/appSlice'

const Swap = () => {
    const location = useLocation()
    const { isConnected } = useAccount()
    const { unsupported } = useNet()
    const [inputValues, setInputValues] = useState(['', ''])

    const dispatch = useAppDispatch()
    const isCanvas = useAppSelector(selectAccountCanvas)
    const choosenToknes = useAppSelector(selectChoosenTokens)
    const inputValue = useAppSelector(selectInputValue)

    function handleShowAccount() {
        dispatch(showAccountCanvas(!isCanvas))
    }
    function swapButtons() {
        dispatch(swapTokens())
    }

    //ONLY UPPER SWAP WORKIN
    useEffect(() => {
        calculateValue(0)
    }, [inputValue[0]])

    function calculateValue(id: number) {
        if (choosenToknes[0] == null || choosenToknes[1] == null) return
        const price1 = choosenToknes[0].price
        const price2 = choosenToknes[1].price
        const amount = inputValue[id]

        let result = ((parseInt(amount) * price2) / price1).toString()

        if (amount == '') result = ''
        let items = [...inputValues]
        items[1] = result
        setInputValues(items)
    }

    return (
        <div className="swap-container">
            <div className={location.pathname === '/swap' ? 'swap-box swap-margin' : 'swap-box'}>
                <div className="swap-top">
                    <div>Swap</div>
                    <div>
                        <FiSettings className="settings-icon" />
                    </div>
                </div>

                <SingleSwap disabled={unsupported} id={0} value={inputValues[0]} />
                <SingleSwap disabled={unsupported} id={1} value={inputValues[1]} />

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
        </div>
    )
}

export default Swap
