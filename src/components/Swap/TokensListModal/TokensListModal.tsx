import { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import {
    clearTokens,
    fetchAsyncTokens,
    selectModal,
    selectNotFound,
    selectTokens,
    showModal,
    TokensType,
} from '../../../redux/tokensModalSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import './tokensListModal.scss'
import { useNetwork } from 'wagmi'

const TokensListModal = () => {
    const [tokensFilter, setTokensFilter] = useState('')

    const dispatch = useAppDispatch()
    const show = useAppSelector(selectModal)
    const reduxTokens = useAppSelector(selectTokens)
    const resultsNotFound = useAppSelector(selectNotFound)

    const handleClose = () => dispatch(showModal(false))
    const [page, setPage] = useState(0)
    const boxRef = useRef<HTMLDivElement>(null)

    const { chain } = useNetwork()
    const chainName = chain?.name.toLocaleLowerCase()

    const handleScroll = () => {
        const box = boxRef.current
        if (box && box.scrollTop + box.clientHeight === box.scrollHeight) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    function disableScroll() {
        if (tokensFilter.length === 0) {
            handleScroll()
        } else {
        }
    }

    function updateTokens() {
        if (tokensFilter.length === 0) {
            dispatch(fetchAsyncTokens(`tokens?page=${page}&networks=${chainName}`))
        } else {
            dispatch(clearTokens())
            dispatch(fetchAsyncTokens(`tokens?search=${tokensFilter}&networks=${chainName}`))
        }
    }

    useEffect(() => {
        dispatch(clearTokens())
        dispatch(fetchAsyncTokens(`tokens?page=${page}&networks=${chainName}`))
    }, [chain])

    useEffect(() => {
        setPage(0)
        setTokensFilter('')
    }, [chain, show])

    useEffect(() => {
        updateTokens()
    }, [dispatch, page, chain, tokensFilter])

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
                <div className="tokens-list" onScroll={disableScroll} ref={boxRef}>
                    {resultsNotFound ? (
                        <div className="no-results-found">No results found.</div>
                    ) : (
                        reduxTokens?.map((token: TokensType) => (
                            <div key={token.key} className="single-token">
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
