import './swap.scss'
import { FiSettings } from 'react-icons/fi'
import { AiOutlineArrowDown } from 'react-icons/ai'

import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAccount } from 'wagmi'

import useNet from '../../common/useNet'
import { selectChoosenTokens, swapTokens } from '../../redux/tokensSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAccountCanvas, showAccountCanvas } from '../../redux/appSlice'
import SingleSwap from './SingleSwap'

const Swap = () => {
    const location = useLocation()
    const { isConnected } = useAccount()
    const { unsupported } = useNet()

    const dispatch = useAppDispatch()
    const isCanvas = useAppSelector(selectAccountCanvas)
    const choosenTokens = useAppSelector(selectChoosenTokens)

    const [inputValue1, setInputValue1] = useState('')
    const [inputValue2, setInputValue2] = useState('')

    useEffect(() => {
        setInputValue1('')
        setInputValue2('')
    }, [choosenTokens])

    const input1Ref = useRef<HTMLInputElement>(null);
    const input2Ref = useRef<HTMLInputElement>(null);

    function changeSecondInput(id: number) {
        const ref = id == 0 ? input1Ref.current : input2Ref.current
        const otherId = id == 0 ? 1 : 0

        if (!ref) return;
        const value = ref.value;
        const valueFloat = value ? parseFloat(value) : 0

        const leftSide = choosenTokens[id]?.price! * valueFloat
        let result = (leftSide / choosenTokens[otherId]?.price!).toString()

        if (result == "0") result = ""

        id == 0 ? setInputValue1(value) : setInputValue2(value)
        if (!choosenTokens.includes(null!)) {
            id == 0 ? setInputValue2(result) : setInputValue1(result)
        }
    }

    function handleShowAccount() {
        dispatch(showAccountCanvas(!isCanvas))
    }

    function swapButtons() {
        dispatch(swapTokens());
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

                <SingleSwap id={0} inputValue={inputValue1} inputRef={input1Ref} changeSecondInput={changeSecondInput} />
                <SingleSwap id={1} inputValue={inputValue2} inputRef={input2Ref} changeSecondInput={changeSecondInput} />

                <button
                    className={unsupported ? 'swap-button swap-button-disabled' : 'swap-button'}
                    onClick={swapButtons}
                >
                    <AiOutlineArrowDown className="arrow-down" />
                </button>
                {isConnected ? (
                    choosenTokens.includes(null!) ? (
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
