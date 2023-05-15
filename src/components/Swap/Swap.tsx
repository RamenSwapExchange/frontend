import './swap.scss'
import { FiSettings } from 'react-icons/fi'
import { AiOutlineArrowDown } from 'react-icons/ai'

import SingleSwap from './SingleSwap'
import TokensListModal from './TokensListModal/TokensListModal'

import { useAccount } from 'wagmi'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAccountCanvas, showAccountCanvas } from '../../redux/appSlice'
import useNet from '../../common/useNet'

const Swap = () => {
    const { isConnected } = useAccount()

    const dispatch = useAppDispatch()
    const isCanvas = useAppSelector(selectAccountCanvas)

    const handleShowAccount = () => dispatch(showAccountCanvas(!isCanvas))
    const swapButtons = () => {
        //TODO
    }
    const { unsupported } = useNet()

    return (
        <>
            <div className="swap-box">
                <div className="swap-top">
                    <div>Swap</div>
                    <div>
                        <FiSettings className="settings-icon" />
                    </div>
                </div>

                <SingleSwap disabled={unsupported} id={0} />
                <SingleSwap disabled={unsupported} id={1} />

                <button
                    className={unsupported ? 'swap-button swap-button-disabled' : 'swap-button'}
                    onClick={swapButtons}
                >
                    <AiOutlineArrowDown />
                </button>

                {isConnected ? (
                    <button className={unsupported ? 'connect-button connect-button-disabled' : 'connect-button'}>
                        Select a token
                    </button>
                ) : (
                    <button className="connect-button" onClick={handleShowAccount}>
                        Connect Wallet
                    </button>
                )}
            </div>

            <TokensListModal />
        </>
    )
}

export default Swap
