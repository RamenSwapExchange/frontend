import { Link } from 'react-router-dom'
import './mobileNavigation.scss'
import InfoDropdown from '../InfoDropdown/InfoDropdown'

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
                <InfoDropdown />
            </div>
        </div>
    )
}

export default MobileNavigation
