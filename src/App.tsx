import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Tokens from './components/Tokens/Tokens'
import Swap from './components/Swap/Swap'
import Pools from './components/Pools/Pools'
import Header from './components/Header/Header'
import AccountCanvas from './components/AccountCanvas/AccountCanvas'

import { useAppDispatch, useAppSelector } from './redux/hooks'
import { useEffect } from 'react'
import { fetchAsyncTokens, selectPage } from './redux/appSlice'
import { useNetwork } from 'wagmi'

const App = () => {
    const dispatch = useAppDispatch()
    const page = useAppSelector(selectPage)
    const { chain } = useNetwork()
    const chainName = chain?.name.toLocaleLowerCase()

    useEffect(() => {
        dispatch(fetchAsyncTokens(`tokens?page=${page}&networks=${chainName}`))
        console.log(chainName)
    }, [dispatch, page])

    return (
        <>
            <Router>
                <Header></Header>
                <Routes>
                    <Route path="/" element={<Navigate to="/swap" />} />
                    <Route path="/swap" element={<Swap />}></Route>
                    <Route path="/tokens" element={<Tokens />}></Route>
                    <Route path="/pools" element={<Pools />}></Route>
                </Routes>
            </Router>
            <AccountCanvas />
        </>
    )
}

export default App
