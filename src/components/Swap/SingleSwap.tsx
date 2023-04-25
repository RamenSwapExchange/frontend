import "./singleSwap.scss"
import { RiArrowDropDownLine } from "react-icons/ri"

import { useNetwork } from 'wagmi'
import { getChainIcon } from '../../common/ChainsIcons'
import { showModal } from '../../redux/appSlice'
import { useAppDispatch } from '../../redux/hooks'

interface ISingleSwap {
    disabled?: boolean
}

const SingleSwap = ({disabled = false}: ISingleSwap) => {
    const { chain } = useNetwork()
    const dispatch = useAppDispatch()
    
    const handleShow = () => {
        if(disabled) return;
        dispatch(showModal(true))
    }

    return (
        <div className="single-swap">
            <input type="text" placeholder="0" className="swap-input" disabled={disabled}/>
            <button className="token-btn" onClick={handleShow} disabled={disabled}>
                {disabled ? "Select token" : 
                    <>
                        <img src={getChainIcon(chain?.id!)} /> 
                        {chain?.nativeCurrency.symbol}
                    </>
                }
                <RiArrowDropDownLine fontSize={25}/>
            </button>
        </div>
    )
}

export default SingleSwap