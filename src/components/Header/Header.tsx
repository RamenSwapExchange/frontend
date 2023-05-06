import './header.scss'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import { MdOutlineRamenDining } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'

import { Link } from 'react-router-dom'
import ConnectButton from './components/ConnectButton'
import ChainsDropdown from './components/ChainsDropdown'
import MobileNavigation from './components/MobileNavigation/MobileNavigation'
import InfoDropdown from './components/InfoDropdown/InfoDropdown'

const Header = () => {
    return (
        <div>
            <Navbar className="header">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto header-left">
                        <Link to="/">
                            <MdOutlineRamenDining className="logo" />
                        </Link>
                        <div className="mobile-search">
                            <AiOutlineSearch className="search-icon" />
                        </div>
                        <Link to="/swap" className="nav-link">
                            Swap
                        </Link>
                        <Link to="/tokens" className="nav-link">
                            Tokens
                        </Link>
                        <Link to="/pools" className="nav-link">
                            Pools
                        </Link>
                        <div className="info-dropdown">
                            <InfoDropdown />
                        </div>
                    </Nav>

                    <Nav className="me-auto header-middle">
                        <NavDropdown.Item>
                            <input type="text" placeholder="Search Tokens" />
                        </NavDropdown.Item>
                    </Nav>

                    <Nav className="me-auto header-right">
                        <ChainsDropdown />
                        <ConnectButton />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <MobileNavigation />
        </div>
    )
}

export default Header
