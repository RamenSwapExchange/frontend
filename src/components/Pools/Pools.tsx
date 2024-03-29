import './pools.scss'
import { AiOutlineContainer } from 'react-icons/ai'
import errorIcon from '/error.png'

import { useAccount } from 'wagmi'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAccountCanvas, showAccountCanvas } from '../../redux/appSlice'
import useNet from '../../common/useNet'

const Pools = () => {
    const { isConnected } = useAccount()
    const { unsupported } = useNet()
    const dispatch = useAppDispatch()
    const showCanvas = useAppSelector(selectAccountCanvas)

    return (
        <div className="container-sm pools-container">
            <div className="pools-header">
                <div className="pools-title">Pools</div>
                <button>+ New Position</button>
            </div>
            <div className="liquidity-container">
                {unsupported ? (
                    <>
                        <img src={errorIcon} className="container-icon" />
                        <div> Your connected network is unsupported. </div>
                    </>
                ) : (
                    <>
                        <AiOutlineContainer className="container-icon" />
                        <div> Your active V3 liquidity positions will appear here. </div>
                    </>
                )}

                {!isConnected && (
                    <button onClick={() => dispatch(showAccountCanvas(!showCanvas))} className="pools-connect-btn">
                        Connect a wallet
                    </button>
                )}
            </div>
        </div>
    )
}

export default Pools
