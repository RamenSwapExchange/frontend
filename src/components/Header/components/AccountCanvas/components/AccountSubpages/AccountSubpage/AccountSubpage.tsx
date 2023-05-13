import './accountSubpage.scss'

interface AccountSubpageProps {
    title: string
    description: string
    buttonText: string
}

const AccountSubpage = ({ title, description, buttonText }: AccountSubpageProps) => {
    return (
        <div className="subpage-container">
            <h5>{title}</h5>
            <p>{description}</p>
            <button>{buttonText}</button>
        </div>
    )
}

export default AccountSubpage
