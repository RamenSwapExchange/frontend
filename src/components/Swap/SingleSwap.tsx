import './singleSwap.scss'
import { RiArrowDropDownLine } from 'react-icons/ri'

import { useState } from 'react'
import { selectSelectedToken, showModal } from '../../redux/tokensModalSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

interface ISingleSwap {
    disabled?: boolean
    id: number
}

const SingleSwap = ({ disabled = false, id }: ISingleSwap) => {
    const dispatch = useAppDispatch()
    const [inputValue, setInputValue] = useState('')
    const selectedToken = useAppSelector(selectSelectedToken)
    const inputAmount = inputValue ? parseInt(inputValue) : 0

    const handleShow = () => {
        dispatch(showModal(true))
    }

    return (
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
                    {disabled ? (
                        'Select token'
                    ) : (
                        <>
                            <img src={selectedToken[id]?.images ? selectedToken[id]?.images[1] : selectedToken[id]?.image} />
                            {selectedToken[id]?.name}
                        </>
                    )}
                    <RiArrowDropDownLine fontSize={25} />
                </button>
            </div>
            <div className="swap-bottom">
                ${selectedToken[id]?.price ? Math.ceil(selectedToken[id]!.price * inputAmount * 100) / 100 : '0'}
            </div>
        </div>
    )
}

export default SingleSwap
