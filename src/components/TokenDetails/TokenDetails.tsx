import './tokenDetails.scss'
import { AiOutlineCopy, AiOutlineArrowLeft } from 'react-icons/ai'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useWindowWidth } from '@react-hook/window-size'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchAsyncTokenDetails, removeSelectedToken, selectProductDetail } from '../../redux/tokensSlice'

const TokenDetails = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector(selectProductDetail)
    const { id } = useParams()
    const onlyWidth = useWindowWidth()

    useEffect(() => {
        dispatch(fetchAsyncTokenDetails(id!))
        return () => {
            dispatch(removeSelectedToken())
        }
    }, [dispatch, id])

    return (
        <div className="container-sm token-detail-container">
            {data?.map((token) => {
                const formattedUpdatedAt = format(new Date(token.updatedAt), 'yyyy-mm-dd')
                const formattedCreatedAt = format(new Date(token.createdAt), 'yyyy-mm-dd')
                const formattedNetwork = token.network.charAt(0).toUpperCase() + token.network.slice(1);
                const addressSliced = onlyWidth < 540 ? token.address.replace(token.address.substring(7, token.address.length - 5), '...') : token.address

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
                                <div>
                                    <div className="token-named">{token.name}</div>
                                    <div className="token-symbol">{token.symbol}</div>
                                </div>
                            </div>
                            <div className="token-price"> <span>${Math.ceil(token.price * 100) / 100}</span></div>
                            <div className="token-address" onClick={() => navigator.clipboard.writeText(token.address)}>
                                Contract address: <b>{addressSliced} <AiOutlineCopy /></b>
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
                                <span><a href={`https://${page}/address/${token.address}`} target='_blank'> Block Explorer </a></span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TokenDetails
