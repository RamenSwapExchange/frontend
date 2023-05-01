import { NavDropdown } from 'react-bootstrap'
import './infoDropdown.scss'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { FaScroll } from 'react-icons/fa'
import { FiBarChart } from 'react-icons/fi'
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai'

const InfoDropdown = () => {
    return (
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
    )
}

export default InfoDropdown
