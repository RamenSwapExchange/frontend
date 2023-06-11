import './header.scss'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { MdOutlineRamenDining } from 'react-icons/md'
import { Link } from 'react-router-dom'

import ConnectButton from './components/ConnectButton'
import ChainsDropdown from './components/ChainsDropdown'
import MobileNavigation from './components/MobileNavigation/MobileNavigation'
import InfoDropdown from './components/InfoDropdown/InfoDropdown'

import { useEffect, useState } from 'react'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        function handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            const isTop = scrollTop === 0

            setIsScrolled(!isTop)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            <Navbar className={`header ${isScrolled ? 'scrolled' : ''}`} fixed="top">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto header-left">
                        <Link to="/">
                            <MdOutlineRamenDining className="logo" />
                        </Link>
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
                    <Nav className="me-auto header-right">
                        <ChainsDropdown />
                        <ConnectButton />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <MobileNavigation />
        </>
    )
}

export default Header
