import './tokenDetails.scss'
import { AiOutlineCopy, AiOutlineArrowLeft } from 'react-icons/ai'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchAsyncTokenDetails, removeSelectedToken, selectProductDetail } from '../../redux/tokensSlice'

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

    console.log(data)

    return (
        <div className="container-sm token-detail-container">
            {data?.map((token) => {
                const formattedUpdatedAt = format(new Date(token.updatedAt), 'yyyy-mm-dd')
                const formattedCreatedAt = format(new Date(token.createdAt), 'yyyy-mm-dd')
                const formattedNetwork = token.network.charAt(0).toUpperCase() + token.network.slice(1);
                let page = "";
                switch (token.network) {
                    case "ethereum":
                        page = "etherscan.io"
                        break;
                    case "polygon":
                        page = "polygonscan.com"
                        break;
                    case "optimism":
                        page = "optimistic.etherscan.io"
                        break;
                }

                return (
                    <div className="token-detail" key={token.address}>
                        <Link to={'/tokens'} className="tokens-link">
                            <AiOutlineArrowLeft fontSize={14} className="link-arrow" />
                            <div>Tokens</div>
                        </Link>
                        <div className="token-info">
                            <div className="token-name">
                                {token.images ? (
                                    <img src={token.images[1]} loading="lazy" alt="Token Image"></img>
                                ) : (
                                    <img src={token.image} loading="lazy" alt="Token Image"></img>
                                )}
                                <div className="token-named">{token.name}</div>
                                <div className="token-symbol">{token.symbol}</div>
                            </div>
                            <div className="token-price"> <b>${Math.ceil(token.price * 100) / 100}</b></div>
                            <div onClick={() => navigator.clipboard.writeText(token.address)}>
                                Address: <b className="token-address" >{token.address} <AiOutlineCopy /></b>
                            </div>
                            <div>
                                Liquidity: <b>{token.liquidity}</b>
                            </div>
                            <div>
                                Platform: <b>{formattedNetwork}</b>
                            </div>
                            <div>
                                Last updated: <b>{formattedUpdatedAt}</b>
                            </div>
                            <div>
                                Created: <b>{formattedCreatedAt}</b>
                            </div>
                            <div className='token-etherscan'>
                                <b><a href={`https://${page}/address/${token.address}`} target='_blank'> Block Explorer </a></b>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TokenDetails
