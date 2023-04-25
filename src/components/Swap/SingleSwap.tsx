import { useNetwork } from 'wagmi'
import { getChainIcon } from '../../common/ChainsIcons'
import { showModal } from '../../redux/appSlice'
import { useAppDispatch } from '../../redux/hooks'

interface ISingleSwap {
    disabled?: boolean
    second?: boolean
}

const SingleSwap = ({disabled = false, second = false }: ISingleSwap) => {
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
                {disabled || second? "Select token" : 
                    <>
                        <img src={getChainIcon(chain?.id!)} /> 
                        {chain?.nativeCurrency.symbol}
                    </>
                }
                <div className="arrow-down">&#x25BC;</div>
            </button>
        </div>
    )
}

export default SingleSwap