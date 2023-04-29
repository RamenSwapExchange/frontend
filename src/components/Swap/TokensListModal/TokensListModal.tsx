import { watchNetwork } from '@wagmi/core'
import { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useNetwork } from 'wagmi'
import {
    changePage,
    clearTokens,
    filterTokens,
    selectModal,
    selectTokens,
    showModal,
    TokensType,
} from '../../../redux/tokensModalSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import './tokensListModal.scss'

const TokensListModal = () => {
    const [tokens, setTokens] = useState<TokensType[]>([])
    const [tokensFilter, setTokensFilter] = useState('')
    const { chain } = useNetwork()

    const dispatch = useAppDispatch()
    const show = useAppSelector(selectModal)
    const reduxTokens = useAppSelector(selectTokens)

    const handleClose = () => dispatch(showModal(false))
    const [page, setPage] = useState(0)
    const boxRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        const box = boxRef.current
        if (box && box.scrollTop + box.clientHeight === box.scrollHeight) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    function updateTokens() {
        setTokens((prevTokens) => {
            const uniqueTokens = reduxTokens
                .filter((newToken) => !prevTokens.some((oldToken) => oldToken.key === newToken.key))
                .filter((token) => token.network === chain?.name?.toLowerCase())
            return [...prevTokens, ...uniqueTokens]
        })
    }

    function filterLocalTokens() {
        setTokens(tokens.filter((token) => token.name.toLowerCase() === tokensFilter.toLowerCase()))
    }

    useEffect(() => {
        dispatch(changePage(page))
    }, [page, dispatch])

    watchNetwork(() => {
        dispatch(clearTokens())
        setTokens([])
        dispatch(changePage(0))
    })

    useEffect(() => {
        updateTokens()
    }, [show, page, reduxTokens, chain])

    useEffect(() => {
        dispatch(filterTokens(tokensFilter))
        filterLocalTokens()
    }, [tokensFilter])

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
                    {tokens?.map((token: TokensType) => (
                        <div key={token.key} className="single-token">
                            <div className="token-image">
                                {token.images ? <img src={token.images[1]}></img> : <img src={token.image}></img>}
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
