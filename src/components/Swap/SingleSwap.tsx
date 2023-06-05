import './singleSwap.scss'
import { useState } from 'react'
import useTokenModal from './useTokenModal/useTokenModal'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { useAppSelector } from '../../redux/hooks'
import { selectChoosenTokens } from '../../redux/tokensSlice'
import { IMaskInput } from "react-imask"

type singleSwapConfig = {
    id: number
    disabled?: boolean
}

const SingleSwap = ({ id, disabled = false }: singleSwapConfig) => {
    const { modal, setShow } = useTokenModal({ id })
    const [inputValue, setInputValue] = useState('')
    const inputAmount = inputValue ? parseFloat(inputValue) : 0

    const choosenToknes = useAppSelector(selectChoosenTokens)
    const token = choosenToknes[id]

    function handleShow() {
        setShow(true)
    }

    return (
        <>
            <div className="single-swap">
                <div className="swap-top">
                    <IMaskInput
                        mask={Number}
                        radix="."
                        placeholder="0"
                        className="swap-input"
                        disabled={disabled}
                        value={inputValue}
                        onAccept={(value) => {
                            setInputValue(value)
                        }}
                        onChange={() => ""}
                    />

                    <button className="token-btn" onClick={handleShow} disabled={disabled}>
                        {disabled || token == null ? (
                            'Select token'
                        ) : (
                            <>
                                <img src={token?.images ? token?.images[1] : token?.image} />
                                {token?.symbol.length > 10 ? token?.symbol.slice(0, 10) + '...' : token?.symbol}
                            </>
                        )}
                        <RiArrowDropDownLine fontSize={25} />
                    </button>
                </div>
                <div className="swap-bottom">
                    ${token?.price ? Math.ceil(token?.price * inputAmount * 100) / 100 : '0'}
                </div>
            </div>
            {modal}
        </>
    )
}

export default SingleSwap
