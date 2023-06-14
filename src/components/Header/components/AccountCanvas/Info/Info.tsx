import "./info.scss"
import gitHubLink from "../../../../../common/gitHubLink"

const Info = () => {
    return (
        <div className="info-container">
            <div> <a href={gitHubLink} target="_blank">Beniamin Szawracki & Gracjan Prusik</a> </div>
            <div className="line" />
            <div> Inspired by Uniswap </div>
            <div> Not every functionality is implemented </div>
        </div>
    )
}

export default Info