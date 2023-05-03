import './home.scss'
import Swap from '../Swap/Swap'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="home-container">
            <Link to={'/swap'}>
                <div className="home-swap">
                    <Swap />
                    <div className="home-overlay" />
                </div>
            </Link>

            <div className="home-header">Ramen Swap</div>
            <Link to="/swap">
                <div className="home-button">Get started</div>
            </Link>
        </div>
    )
}

export default Home
