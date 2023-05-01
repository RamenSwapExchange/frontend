import { Link } from 'react-router-dom'
import './mobileNavigation.scss'
import ChainsDropdown from './ChainsDropdown'

const MobileNavigation = () => {
    return (
        <div className="mobile-nav">
            <Link to="/swap" className="nav-link">
                Swap
            </Link>
            <Link to="/tokens" className="nav-link">
                Tokens
            </Link>
            <Link to="/pools" className="nav-link">
                Pools
            </Link>
            <div className="nav-link">
                <ChainsDropdown />
            </div>
        </div>
    )
}

export default MobileNavigation
