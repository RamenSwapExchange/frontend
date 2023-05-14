import '../AccountSubpage/accountSubpage.scss'
import activityImg from '/subpages/activity-subpage.png'

const ActivitySubpage = () => {
    return (
        <div className="subpage-container">
            <img src={activityImg} alt={activityImg} />
            <h5>No activity yet</h5>
            <p>Your onchain transactions and crypto purchases will appear here.</p>
        </div>
    )
}

export default ActivitySubpage
