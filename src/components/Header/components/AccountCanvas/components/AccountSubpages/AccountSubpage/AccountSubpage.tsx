import './accountSubpage.scss'

interface AccountSubpageProps {
    title: string
    description: string
    buttonText: string
    img_src: string
}

const AccountSubpage = ({ title, description, buttonText, img_src }: AccountSubpageProps) => {
    return (
        <div className="subpage-container">
            <img src={img_src} alt={img_src} />
            <h5>{title}</h5>
            <p>{description}</p>
            <button>{buttonText}</button>
        </div>
    )
}

export default AccountSubpage
