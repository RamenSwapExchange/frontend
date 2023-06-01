import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchAsyncTokenDetails, removeSelectedToken, selectProductDetail } from '../../redux/tokensSlice'
import { format } from 'date-fns'
import './tokenDetails.scss'

const TokenDetails = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector(selectProductDetail)
    console.log(data)
    //https://api.portals.fi/v2/tokens?addresses=polygon:0xf5164054dc7a1997ecc42b996b8bf12a2046048c
    const { id } = useParams()
    console.log(id)

    useEffect(() => {
        dispatch(fetchAsyncTokenDetails(id!))
        return () => {
            dispatch(removeSelectedToken())
        }
    }, [dispatch, id])

    return (
        <div className="container-sm token-detail-container">
            {data?.map((token) => {
                const formattedUpdatedAt = format(new Date(token.updatedAt), 'yyyy-MM-dd HH:mm:ss')
                const formattedCreatedAt = format(new Date(token.createdAt), 'yyyy-MM-dd HH:mm:ss')
                return (
                    <div className="token-detail" key={token.address}>
                        <Link to={'/tokens'} className="tokens-link">
                            &larr; Tokens
                        </Link>
                        <div className="token-info">
                            <div className="token-name">
                                {token.images ? (
                                    <img src={token.images[1]} loading="lazy" alt="Token Image"></img>
                                ) : (
                                    <img src={token.image} loading="lazy" alt="Token Image"></img>
                                )}
                                <div>{token.name}</div>
                                <div>{token.symbol}</div>
                            </div>
                            <div>${Math.ceil(token.price * 100) / 100}</div>
                            <div>{token.address}</div>
                            <div>Platform: {token.network}</div>
                            <div>Last updated: {formattedUpdatedAt}</div>
                            <div>Created: {formattedCreatedAt}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TokenDetails
