import { Link } from 'react-router-dom'
import { showAccountCanvas } from '../../../../../../../redux/appSlice'
import { useAppDispatch } from '../../../../../../../redux/hooks'
import './accountSubpage.scss'

interface AccountSubpageProps {
    title: string
    description: string
    buttonText: string
    img_src: string
    href: string;
}

const AccountSubpage = ({ title, description, buttonText, img_src, href }: AccountSubpageProps) => {

    const dispatch = useAppDispatch()

    return (
        <div className="subpage-container">
            <img src={img_src} alt={img_src} />
            <h5>{title}</h5>
            <p>{description}</p>
            <Link to={`/${href}`}><button onClick={() => dispatch(showAccountCanvas(false))}>{buttonText}</button></Link>
        </div>
    )
}

export default AccountSubpage
