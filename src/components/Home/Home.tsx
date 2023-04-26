import Swap from "../Swap/Swap"
import "./home.scss"
import logo from "/logo.png"

import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div className='home-container'>
            <div className="home-swap">
                <Swap />
            </div>
            <img src={logo} alt="logo" className="home-logo" />
            <div className="home-header"> Ramen Swap </div>
            <Link style={{ textDecoration: "none" }} to="/swap">
                <div className="home-button"> Get started </div>
            </Link>
        </div>
    )
}

export default Home