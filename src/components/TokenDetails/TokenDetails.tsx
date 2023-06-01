import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchAsyncTokenDetails, removeSelectedToken, selectProductDetail } from '../../redux/tokensSlice'
import { format } from 'date-fns'
import './tokenDetails.scss'
import { AiOutlineCopy } from 'react-icons/ai'

const TokenDetails = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector(selectProductDetail)
    const { id } = useParams()

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
                                <div className="token-symbol">{token.symbol}</div>
                            </div>
                            <div className="token-price">${Math.ceil(token.price * 100) / 100}</div>
                            <div onClick={() => navigator.clipboard.writeText(token.address)} className="token-address">
                                {token.address} <AiOutlineCopy className="copy-icon" />
                            </div>
                            <div>
                                Liquidity: <b>{token.liquidity}</b>
                            </div>
                            <div>
                                Platform: <b>{token.network}</b>
                            </div>
                            <div>
                                Last updated: <b>{formattedUpdatedAt}</b>
                            </div>
                            <div>
                                Created: <b>{formattedCreatedAt}</b>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TokenDetails
