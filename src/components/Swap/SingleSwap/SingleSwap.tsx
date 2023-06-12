import './singleSwap.scss'
import { RiArrowDropDownLine } from 'react-icons/ri'

import { Ref } from 'react'
import { IMaskInput } from 'react-imask'

import useTokenModal from '../../../common/useTokenModal/useTokenModal'
import useNet from '../../../common/useNet'

import { useAppSelector } from '../../../redux/hooks'
import { selectChoosenTokens } from '../../../redux/tokensSlice'

type SingleSwapConfig = {
    id: number
    inputValue: string
    inputRef: Ref<HTMLInputElement>
    changeSecondInput: (id: number) => void
}

const SingleSwap = ({ id, inputValue, inputRef, changeSecondInput }: SingleSwapConfig) => {
    const { unsupported } = useNet()
    const { modal, setShow } = useTokenModal({ id })
    const choosenTokens = useAppSelector(selectChoosenTokens)

    const inputAmount = inputValue ? parseFloat(inputValue) : 0

    function handleShowModal() {
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
                        disabled={unsupported}
                        value={inputValue}
                        inputRef={inputRef}
                        onChange={(e) => changeSecondInput(id)}
                    />

                    <button
                        className={unsupported ? 'token-btn token-btn-disabled' : 'token-btn '}
                        onClick={() => handleShowModal()}
                        disabled={unsupported}
                    >
                        {unsupported || choosenTokens[id] == null ? (
                            'Select token'
                        ) : (
                            <>
                                <img
                                    src={
                                        choosenTokens[id]?.images
                                            ? choosenTokens[id]?.images[1]
                                            : choosenTokens[id]?.image
                                    }
                                />
                                {choosenTokens[id]!.symbol.length > 10
                                    ? choosenTokens[id]?.symbol.slice(0, 10) + '...'
                                    : choosenTokens[id]?.symbol}
                            </>
                        )}
                        <RiArrowDropDownLine fontSize={25} />
                    </button>
                </div>
                <div className="swap-bottom">
                    ${choosenTokens[id]?.price ? Math.ceil(choosenTokens[id]!.price * inputAmount * 100) / 100 : '0'}
                </div>
            </div>
            {modal}
        </>
    )
}

export default SingleSwap
