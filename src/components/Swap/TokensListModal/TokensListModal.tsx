import './tokensListModal.scss'
import { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import {
    clearTokens,
    fetchAsyncTokens,
    selectModal,
    selectNotFound,
    selectToken,
    selectTokens,
    showModal,
    TokensType,
} from '../../../redux/tokensModalSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import useNet from '../../../common/useNet'

const TokensListModal = () => {
    const [tokensFilter, setTokensFilter] = useState('')

    const dispatch = useAppDispatch()
    const show = useAppSelector(selectModal)
    const reduxTokens = useAppSelector(selectTokens)
    const resultsNotFound = useAppSelector(selectNotFound)

    const handleClose = () => dispatch(showModal(false))
    const [page, setPage] = useState(0)
    const boxRef = useRef<HTMLDivElement>(null)

    const { net } = useNet()
    const netName = net?.name.toLocaleLowerCase()

    function handleScroll() {
        const box = boxRef.current
        if (box && box.scrollTop + box.clientHeight === box.scrollHeight) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    function disableScroll() {
        if (tokensFilter.length === 0) {
            handleScroll()
        }
    }

    function handleSelectToken(token: TokensType) {
        if (token) {
            dispatch(selectToken({token: token, id: 0}))
        }
        handleClose()
    }

    function updateTokens() {
        if (tokensFilter.length === 0) {
            dispatch(fetchAsyncTokens(`tokens?page=${page}&networks=${netName}`))
        } else {
            dispatch(clearTokens())
            dispatch(fetchAsyncTokens(`tokens?search=${tokensFilter}&networks=${netName}`))
        }
    }

    useEffect(() => {
        dispatch(clearTokens())
        dispatch(fetchAsyncTokens(`tokens?page=${page}&networks=${netName}`))
    }, [net])

    useEffect(() => {
        setPage(0)
        setTokensFilter('')
    }, [net, show])

    useEffect(() => {
        updateTokens()
    }, [dispatch, page, net, tokensFilter])

    return (
        <Modal show={show} onHide={handleClose} className="tokens-modal">

            <Modal.Header className="tokens-header" closeButton>
                <Modal.Title>Select a token</Modal.Title>
            </Modal.Header>

            <Modal.Body className="tokens-modal-body">
                <input
                    type="text"
                    placeholder="Search name"
                    className="search-token-input"
                    onChange={(e) => setTokensFilter(e.target.value)}
                />
                <div className="tokens-list" onScroll={disableScroll} ref={boxRef}>
                    {resultsNotFound ? (
                        <div className="no-results-found">No results found.</div>
                    ) : (
                        reduxTokens.map((token: TokensType) => (
                            <div key={token.key} className="single-token" onClick={() => handleSelectToken(token)}>
                                <div className="token-image">
                                    {token.images ? <img src={token.images[1]}></img> : <img src={token.image}></img>}
                                </div>
                                <div>
                                    <div className="token-name">{token.name}</div>
                                    <div className="token-symbol">{token.symbol}</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default TokensListModal
