import './singleSwap.scss'
import { RiArrowDropDownLine } from 'react-icons/ri'

import { useState } from "react"
import { showModal } from '../../redux/tokensModalSlice'
import { useAppDispatch } from '../../redux/hooks'
import useNetIcon from '../../common/useNetIcon'

interface ISingleSwap {
    disabled?: boolean
    token: any
}

const SingleSwap = ({ disabled = false, token }: ISingleSwap) => {
    const dispatch = useAppDispatch()
    const { icon } = useNetIcon();
    const [inputValue, setInputValue] = useState("");

    const handleShow = () => {
        dispatch(showModal(true))
    }

    return (
        <div className="single-swap">
            <input type="text" placeholder="0" className="swap-input" disabled={disabled}
                pattern="^[0-9]*[.]?[0-9]*$"
                value={inputValue}
                onChange={(e) =>
                    setInputValue((v) => (e.target.validity.valid ? e.target.value : v))
                } />

            <button className="token-btn" onClick={handleShow} disabled={disabled}>
                {disabled ? (
                    'Select token'
                ) : (
                    <>
                        <img src={icon} />
                        {token.nativeCurrency?.symbol}
                    </>
                )}
                <RiArrowDropDownLine fontSize={25} />
            </button>
        </div>
    )
}

export default SingleSwap
