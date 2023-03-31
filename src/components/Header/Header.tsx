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
        <Nav className="me-auto header-left">
          <Link to="/swap" className="nav-link">
            Swap
          </Link>
          <Link to="/tokens" className="nav-link">
            Tokens
          </Link>
          <Link to="/pools" className="nav-link">
            Pools
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
        </Nav>
        <Nav className="me-auto header-middle">
          <NavDropdown.Item>
            <input type="text" placeholder="Search Tokens" />
          </NavDropdown.Item>
        </Nav>
        <Nav className="me-auto header-right">
          <NavDropdown title={"x"} id="basic-nav-dropdown" align="end">
            <NavDropdown.Item>A</NavDropdown.Item>
            <NavDropdown.Item>B</NavDropdown.Item>
          </NavDropdown>
          <ConnectButton />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
