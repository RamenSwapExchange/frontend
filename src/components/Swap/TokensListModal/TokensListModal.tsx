import { watchNetwork } from '@wagmi/core'
import { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useNetwork } from 'wagmi'
import { changePage, clearTokens, selectModal, selectTokens, showModal, TokensType } from '../../../redux/appSlice'
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

    useEffect(() => {
        dispatch(changePage(page))
    }, [page, dispatch])

    useEffect(() => {
        dispatch(clearTokens())
        setTokens([])
        setPage(0)
    }, [chain])

    useEffect(() => {
        updateTokens()
    }, [show, tokensFilter, page, reduxTokens, chain])

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
                    {tokens?.map((token) => (
                        <div key={token.key} className="single-token">
                            <div className="token-image">
                                {token.images ? <img src={token.images[1]}></img> : <img src={token.image}></img>}
                            </div>
                            <div>
                                <div className="token-name">{token.name}</div>
                                <div className="token-symbol">
                                    {token.symbol} <br /> {token.network}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default TokensListModal
