import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Tokens from './components/Tokens/Tokens'
import Swap from './components/Swap/Swap'
import Pools from './components/Pools/Pools'
import Header from './components/Header/Header'

import { useAppDispatch, useAppSelector } from './redux/hooks'
import { useEffect } from 'react'
import { fetchAsyncTokens, selectPage } from './redux/appSlice'

const App = () => {
    const dispatch = useAppDispatch()
    const page = useAppSelector(selectPage)

    useEffect(() => {
        dispatch(fetchAsyncTokens(`tokens?page=${page}`))
    }, [dispatch, page])

    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Navigate to="/swap" />} />
                    <Route path="/swap" element={<Swap />}></Route>
                    <Route path="/tokens" element={<Tokens />}></Route>
                    <Route path="/pools" element={<Pools />}></Route>
                </Routes>
            </Router>
        </>
    )
}

export default App
