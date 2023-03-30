import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./header.scss";
import { MdOutlineRamenDining } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const Header = () => {
    return (
        <Navbar className="header">
            <Navbar.Brand><MdOutlineRamenDining className='logo' /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link>Swap</Nav.Link>
                    <Nav.Link>Tokens</Nav.Link>
                    <Nav.Link>Pool</Nav.Link>
                    <NavDropdown title={<BiDotsHorizontalRounded />} id="basic-nav-dropdown">
                        <NavDropdown.Item>Vote in governance</NavDropdown.Item>
                        <NavDropdown.Item>
                            View more analytics
                        </NavDropdown.Item>
                        <NavDropdown.Item>Help center</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                            Documentation
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            Feedback
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            Legal & Privacy
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header