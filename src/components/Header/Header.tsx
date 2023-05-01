import './header.scss'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import { MdOutlineRamenDining } from 'react-icons/md'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { FaScroll } from 'react-icons/fa'
import { FiBarChart } from 'react-icons/fi'
import { AiOutlineTwitter, AiFillGithub, AiOutlineSearch } from 'react-icons/ai'

import { Link } from 'react-router-dom'
import ConnectButton from './components/ConnectButton'
import ChainsDropdown from './components/ChainsDropdown'
import MobileNavigation from './components/MobileNavigation'

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

                        <NavDropdown title={<BiDotsHorizontalRounded className="dots-icon" />} id="basic-nav-dropdown">
                            <NavDropdown.Item className="dropdown-li">
                                <FaScroll className="dropdown-icon" />
                                Vote in governance
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdown-li">
                                <FiBarChart className="dropdown-icon" />
                                View more analytics
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item className="info-item">Help center &#8599;</NavDropdown.Item>
                            <NavDropdown.Item className="info-item">Documentation &#8599;</NavDropdown.Item>
                            <NavDropdown.Item className="info-item">Feedback &#8599;</NavDropdown.Item>
                            <NavDropdown.Item className="info-item">Legal & Privacy &#8599;</NavDropdown.Item>
                            <NavDropdown.ItemText className="dropdown-socials">
                                <AiOutlineTwitter className="social-link" />
                                <AiFillGithub className="social-link" />
                            </NavDropdown.ItemText>
                        </NavDropdown>
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
