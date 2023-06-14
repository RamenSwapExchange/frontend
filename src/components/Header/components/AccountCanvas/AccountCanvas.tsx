import './accountCanvas.scss'
import { Offcanvas } from 'react-bootstrap'
import { useAccount } from 'wagmi'

import ThemeButton from './components/ThemeButton'
import ConnectorList from './components/ConnectorList'
import Account from './components/Account'

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { selectAccountCanvas, showAccountCanvas } from '../../../../redux/appSlice'
import Info from './Info/Info'

const AccountCanvas = () => {
    const dispatch = useAppDispatch()
    const isCanvas = useAppSelector(selectAccountCanvas)
    const { isConnected } = useAccount({
        onDisconnect() {
            handleClose()
        },
    })

    const handleClose = () => dispatch(showAccountCanvas(false))

    return (
        <>
            <Offcanvas show={isCanvas} placement={'end'} backdrop={false} className="main-canvas">
                <div className="main-div-canvas">
                    <div className="left-panel" onClick={handleClose}>
                        &gt;&gt;
                    </div>

                    <div className="right-panel">
                        {isConnected ? <Account /> : <ConnectorList onConnectAccount={handleClose} />}
                        <Info />
                        <ThemeButton />
                    </div>
                </div>
            </Offcanvas>

            <Offcanvas show={isCanvas} placement={'bottom'} backdrop={false} className="main-canvas-mobile">
                <div className="backdrop-mobile" onClick={handleClose} />
                <div className="right-panel">
                    {isConnected ? <Account /> : <ConnectorList onConnectAccount={handleClose} />}
                    <Info />
                    <ThemeButton />
                </div>
            </Offcanvas >
        </>
    )
}

export default AccountCanvas
