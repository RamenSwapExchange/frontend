import { Link } from 'react-router-dom'
import './accountSubpage.scss'

interface AccountSubpageProps {
    title: string
    description: string
    buttonText: string
    img_src: string
    href: string;
}

const AccountSubpage = ({ title, description, buttonText, img_src, href }: AccountSubpageProps) => {
    return (
        <div className="subpage-container">
            <img src={img_src} alt={img_src} />
            <h5>{title}</h5>
            <p>{description}</p>
            <Link to={`/${href}`}><button>{buttonText}</button></Link>
        </div>
    )
}

export default AccountSubpage
