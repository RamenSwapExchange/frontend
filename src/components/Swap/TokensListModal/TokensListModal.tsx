import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { changePage, selectModal, selectTokens, showModal, TokensType } from '../../../redux/appSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import './tokensListModal.scss'

const TokensListModal = () => {
    const [tokens, setTokens] = useState<TokensType[]>()
    const [tokensFilter, setTokensFilter] = useState('')

    const dispatch = useAppDispatch()
    const show = useAppSelector(selectModal)
    const reduxTokens = useAppSelector(selectTokens)

    console.log(tokens)

    const handleClose = () => dispatch(showModal(false))
    const [page, setPage] = useState(0)
    const boxRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        const box = boxRef.current
        if (box && box.scrollTop + box.clientHeight === box.scrollHeight) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    useEffect(() => {
        console.log('page: ' + page)
        dispatch(changePage(page))
    }, [page, dispatch])

    useEffect(() => {
        setTokens((oldList) => {
            const uniqueTokens = reduxTokens.filter(
                (newToken) => !oldList || !oldList.some((oldToken) => oldToken.key === newToken.key)
            )
            return oldList ? [...oldList, ...uniqueTokens] : uniqueTokens
        })
    }, [show, tokensFilter, page, reduxTokens])

    return (
        <Modal show={show} onHide={handleClose} className="tokens-modal">
            <Modal.Header closeButton>
                <Modal.Title>Select a token</Modal.Title>
            </Modal.Header>
            <Modal.Body className="tokens-modal-body">
                <input
                    type="text"
                    placeholder="Search name"
                    className="search-token-input"
                    onChange={(e) => setTokensFilter(e.target.value)}
                />
                <div className="tokens-list" onScroll={handleScroll} ref={boxRef}>
                    {tokens &&
                        tokens
                            .filter((token) => token.network === 'polygon')
                            .map((token) => (
                                <div key={token.key} className="single-token">
                                    <div className="token-image">
                                        {token.images ? (
                                            <img src={token.images[1]}></img>
                                        ) : (
                                            <img src={token.image}></img>
                                        )}
                                    </div>
                                    <div>
                                        <div className="token-name">{token.name}</div>
                                        <div className="token-symbol">{token.symbol}</div>
                                    </div>
                                </div>
                            ))}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default TokensListModal
