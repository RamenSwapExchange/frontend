import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./header.scss";
import { MdOutlineRamenDining } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import ConnectButton from "./ConnectButton";

const Header = () => {
  return (
    <Navbar className="header">
      <Navbar.Brand>
        <MdOutlineRamenDining className="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <div className="header-left">
            <Link to="/swap" className="nav-link">
              <Nav.Link>Swap</Nav.Link>
            </Link>
            <Link to="/tokens" className="nav-link">
              <Nav.Link>Tokens</Nav.Link>
            </Link>
            <Link to="/pools" className="nav-link">
              <Nav.Link>Pools</Nav.Link>
            </Link>
            <NavDropdown
              title={<BiDotsHorizontalRounded className="dots-icon" />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>Vote in governance</NavDropdown.Item>
              <NavDropdown.Item>View more analytics</NavDropdown.Item>
              <NavDropdown.Item>Help center</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Documentation</NavDropdown.Item>
              <NavDropdown.Item>Feedback</NavDropdown.Item>
              <NavDropdown.Item>Legal & Privacy</NavDropdown.Item>
            </NavDropdown>
          </div>
          <div className="header-middle"></div>
          <div className="header-right">
            <ConnectButton />
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
