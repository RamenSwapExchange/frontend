import 'bootstrap/dist/css/bootstrap.min.css'
import './app.scss'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Tokens from './components/Tokens/Tokens'
import Swap from './components/Swap/Swap'
import Pools from './components/Pools/Pools'
import Header from './components/Header/Header'
import Home from './components/Home/Home'

const App = () => {
    return (
        <Router>
            <Header />
            <div className="center-main-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/swap" element={<Swap />}></Route>
                    <Route path="/tokens" element={<Tokens />}></Route>
                    <Route path="/pools" element={<Pools />}></Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App
