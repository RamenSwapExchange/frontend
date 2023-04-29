import './singleSwap.scss'
import { RiArrowDropDownLine } from 'react-icons/ri'

import { getChainIcon } from '../../common/ChainsIcons'
import { showModal } from '../../redux/tokensModalSlice'
import { useAppDispatch } from '../../redux/hooks'

interface ISingleSwap {
    disabled?: boolean
    token: any
}

const SingleSwap = ({ disabled = false, token }: ISingleSwap) => {
    const dispatch = useAppDispatch()

    const handleShow = () => {
        dispatch(showModal(true))
    }

    return (
        <div className="single-swap">
            <input type="text" placeholder="0" className="swap-input" disabled={disabled} />
            <button className="token-btn" onClick={handleShow} disabled={disabled}>
                {disabled ? (
                    'Select token'
                ) : (
                    <>
                        <img src={getChainIcon(token.id)} />
                        {token.nativeCurrency?.symbol}
                    </>
                )}
                <RiArrowDropDownLine fontSize={25} />
            </button>
        </div>
    )
}

export default SingleSwap
