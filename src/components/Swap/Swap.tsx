import './singleSwap.scss'
import './swap.scss'
import { FiSettings } from 'react-icons/fi'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { useLocation } from 'react-router-dom'
import { useAccount } from 'wagmi'
import useNet from '../../common/useNet'
import { selectChoosenTokens, swapTokens } from '../../redux/tokensSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAccountCanvas, showAccountCanvas } from '../../redux/appSlice'
import { useRef, useState, useEffect } from 'react'
import useTokenModal from './useTokenModal/useTokenModal'
import { IMaskInput } from 'react-imask'
import { RiArrowDropDownLine } from 'react-icons/ri'

const Swap = () => {
    const location = useLocation()
    const { isConnected } = useAccount()
    const { unsupported } = useNet()

    const dispatch = useAppDispatch()
    const isCanvas = useAppSelector(selectAccountCanvas)
    const choosenTokens = useAppSelector(selectChoosenTokens)

    function handleShowAccount() {
        dispatch(showAccountCanvas(!isCanvas))
    }
    function swapButtons() {
        dispatch(swapTokens());
    }

    const { modal, show: { setId, setShow } } = useTokenModal()

    const [inputValue1, setInputValue1] = useState('')
    const [inputValue2, setInputValue2] = useState('')

    const input1 = useRef<HTMLInputElement>(null);
    const input2 = useRef<HTMLInputElement>(null);

    const inputAmount1 = inputValue1 ? parseFloat(inputValue1) : 0
    const inputAmount2 = inputValue2 ? parseFloat(inputValue2) : 0

    function handleShow(id: number) {
        setId(id)
        setShow(true)
    }

    function onChangeInput(id: number) {
        const ref = id == 0 ? input1.current : input2.current
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

    useEffect(() => {
        setInputValue1('')
        setInputValue2('')
    }, [choosenTokens])


    return (
        <div className="swap-container">
            <div className={location.pathname === '/swap' ? 'swap-box swap-margin' : 'swap-box'}>
                <div className="swap-top">
                    <div>Swap</div>
                    <div>
                        <FiSettings className="settings-icon" />
                    </div>
                </div>

                <div className="single-swap">
                    <div className="swap-top">
                        <IMaskInput
                            mask={Number}
                            radix="."
                            placeholder="0"
                            className="swap-input"
                            disabled={unsupported}
                            value={inputValue1}
                            inputRef={input1}
                            onChange={(e) => onChangeInput(0)}
                        />

                        <button className="token-btn" onClick={() => handleShow(0)} disabled={unsupported}>
                            {unsupported || choosenTokens[0] == null ? (
                                'Select token'
                            ) : (
                                <>
                                    <img src={choosenTokens[0]?.images ? choosenTokens[0]?.images[1] : choosenTokens[0]?.image} />
                                    {choosenTokens[0]?.symbol.length > 10 ? choosenTokens[0]?.symbol.slice(0, 10) + '...' : choosenTokens[0]?.symbol}
                                </>
                            )}
                            <RiArrowDropDownLine fontSize={25} />
                        </button>
                    </div>
                    <div className="swap-bottom">
                        ${choosenTokens[0]?.price ? Math.ceil(choosenTokens[0]?.price * inputAmount1 * 100) / 100 : '0'}
                    </div>
                </div>
                <div className="single-swap">
                    <div className="swap-top">
                        <IMaskInput
                            mask={Number}
                            radix="."
                            placeholder="0"
                            className="swap-input"
                            disabled={unsupported}
                            value={inputValue2}
                            inputRef={input2}
                            onChange={(e) => onChangeInput(1)}
                        />

                        <button className="token-btn" onClick={() => handleShow(1)} disabled={unsupported}>
                            {unsupported || choosenTokens[1] == null ? (
                                'Select token'
                            ) : (
                                <>
                                    <img src={choosenTokens[1]?.images ? choosenTokens[1]?.images[1] : choosenTokens[1]?.image} />
                                    {choosenTokens[1]?.symbol.length > 10 ? choosenTokens[1]?.symbol.slice(0, 10) + '...' : choosenTokens[1]?.symbol}
                                </>
                            )}
                            <RiArrowDropDownLine fontSize={25} />
                        </button>
                    </div>
                    <div className="swap-bottom">
                        ${choosenTokens[1]?.price ? Math.ceil(choosenTokens[1]?.price * inputAmount2 * 100) / 100 : '0'}
                    </div>
                </div>

                {modal}


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
