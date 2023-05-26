import './singleSwap.scss'
import { useState } from 'react'
import useTokenModal from './useTokenModal/useTokenModal'
import { RiArrowDropDownLine } from 'react-icons/ri'

type singleSwapConfig = {
    disabled?: boolean
}

const SingleSwap = ({ disabled = false }: singleSwapConfig) => {
    const { modal, token, setShow } = useTokenModal();
    const [inputValue, setInputValue] = useState('')
    const inputAmount = inputValue ? parseInt(inputValue) : 0

    function handleShow() {
        setShow(true)
    }

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
                        {disabled ? (
                            'Select token'
                        ) : (
                            <>
                                <img
                                    src={
                                        token?.images ? token?.images[1] : token?.image
                                    }
                                />
                                {token?.name}
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
