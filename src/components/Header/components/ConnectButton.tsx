import './connectButton.scss'
import { useAccount } from 'wagmi'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectAccountCanvas, showAccountCanvas } from '../../../redux/appSlice'
import AccountCanvas from '../../AccountCanvas/AccountCanvas'

const ConnectButton = () => {
    const { address, isConnected } = useAccount()
    const addressSliced = address?.replace(address.substring(7, address.length - 5), '...')

    const showCanvas = useAppSelector(selectAccountCanvas)
    const dispatch = useAppDispatch()

    return (
        <>
            <div className="connect-button-main" onClick={() => dispatch(showAccountCanvas(!showCanvas))}>
                {isConnected ? addressSliced : 'Connect'}
            </div>

            <AccountCanvas />
        </>
    )
}

export default ConnectButton
