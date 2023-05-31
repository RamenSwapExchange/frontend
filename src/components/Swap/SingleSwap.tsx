import './singleSwap.scss'
import { useEffect, useState } from 'react'
import useTokenModal from './useTokenModal/useTokenModal'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectChoosenTokens, setInputValueRedux } from '../../redux/tokensSlice'

type singleSwapConfig = {
    disabled?: boolean
    id: number
}

const SingleSwap = ({ disabled = false, id }: singleSwapConfig) => {
    const { modal, setShow } = useTokenModal({ id })
    const [inputValue, setInputValue] = useState('')
    const inputAmount = inputValue ? parseInt(inputValue) : 0

    const dispatch = useAppDispatch();

    const choosenToknes = useAppSelector(selectChoosenTokens)
    const token = choosenToknes[id]

    function handleShow() {
        setShow(true)
    }

    useEffect(() => {
        dispatch(setInputValueRedux({id, value: inputValue}))
    }, [inputValue])
    
    return (
        <>
            <div className="single-swap">
                <div className="swap-top">
                    <input
                        type="text"
                        placeholder="0"
                        className="swap-input"
                        disabled={disabled}
                        pattern="^[0-9]*[.]?[0-9]*$"
                        value={disabled ? 0 : inputValue}
                        onChange={(e) => setInputValue((v) => (e.target.validity.valid ? e.target.value : v))}
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
