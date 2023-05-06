import './accountCanvas.scss'
import { Offcanvas } from 'react-bootstrap'
import { useAccount } from 'wagmi'

import ThemeButton from './components/ThemeButton'
import ConnectorList from './components/ConnectorList'
import Account from './components/Account'

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { selectAccountCanvas, showAccountCanvas } from '../../../../redux/appSlice'

const AccountCanvas = () => {
    const { isConnected } = useAccount({
        onDisconnect() {
            handleClose()
        },
    })

    const handleClose = () => dispatch(showAccountCanvas(false))

    const isCanvas = useAppSelector(selectAccountCanvas)
    const dispatch = useAppDispatch()

    return (
        <>
            <Offcanvas show={isCanvas} placement={'end'} backdrop={false} className="main-canvas">
                <div className="main-div-canvas">
                    <div className="left-panel" onClick={handleClose}>
                        &gt;&gt;
                    </div>

                    <div className="right-panel">
                        {isConnected ? <Account /> : <ConnectorList onConnectAccount={handleClose} />}

                        <ThemeButton />
                    </div>
                </div>
            </Offcanvas>

            <Offcanvas show={isCanvas} placement={'bottom'} backdrop={false} className="main-canvas-mobile">
                <div className='backdrop-mobile' onClick={handleClose} />
                <div className="right-panel">
                    {isConnected ? <Account /> : <ConnectorList onConnectAccount={handleClose} />}

                    <ThemeButton />
                </div>
            </Offcanvas>
        </>
    )
}

export default AccountCanvas
