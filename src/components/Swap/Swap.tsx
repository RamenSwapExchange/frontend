import './swap.scss'
import { FiSettings } from 'react-icons/fi'
import { AiOutlineArrowDown } from 'react-icons/ai'
import TokensListModal from './TokensListModal/TokensListModal'
import { useAccount, useNetwork } from 'wagmi'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAccountCanvas, showAccountCanvas } from '../../redux/appSlice'
import SingleSwap from './SingleSwap'

const Swap = () => {
    const { isConnected } = useAccount()
    const { chain } = useNetwork()
    const dispatch = useAppDispatch()
    const isCanvas = useAppSelector(selectAccountCanvas)

    const handleShowAccount = () => dispatch(showAccountCanvas(!isCanvas))
    const swapButtons = () => {
        //TODO
    }

    const isUnsupportedChain = chain?.unsupported!

    return (
        <>
            <div className="swap-box">
                <div className="swap-top">
                    <div>Swap</div>
                    <div>
                        <FiSettings className="settings-icon" />
                    </div>
                </div>

                <SingleSwap disabled={isUnsupportedChain} token={''} />
                <SingleSwap disabled={isUnsupportedChain} token={''} />

                <button
                    className={isUnsupportedChain ? 'swap-button swap-button-disabled' : 'swap-button'}
                    onClick={swapButtons}
                >
                    <AiOutlineArrowDown />
                </button>

                {isConnected ? (
                    <button
                        className={isUnsupportedChain ? 'connect-button connect-button-disabled' : 'connect-button'}
                    >
                        {' '}
                        Select a token{' '}
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
