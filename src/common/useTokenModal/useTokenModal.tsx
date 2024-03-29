import './useTokenModal.scss'
import { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import {
    chooseToken,
    clearTokens,
    fetchTokens,
    resetChoosenTokens,
    selectTokens,
    TokensType,
} from '../../redux/tokensSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import useNet from '../../common/useNet'

const useTokenModal = ({ id }: { id: number }) => {
    const dispatch = useAppDispatch()
    const reduxTokens = useAppSelector(selectTokens)

    const [tokensFilter, setTokensFilter] = useState('')
    const [page, setPage] = useState(0)
    const [show, setShow] = useState(false)

    const boxRef = useRef<HTMLDivElement>(null)

    const { net } = useNet()
    const netName = net?.name.toLocaleLowerCase()

    function handleClose() {
        setShow(false)
    }

    function handleScroll() {
        const box = boxRef.current
        if (box && box.scrollTop + box.clientHeight === box.scrollHeight) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    function disableScroll() {
        if (tokensFilter.length !== 0) return
        handleScroll()
    }

    function handleSelectToken(token: TokensType) {
        if (token) {
            dispatch(chooseToken({ token: token, id }))
        }
        handleClose()
    }

    function updateTokens() {
        if (tokensFilter.length === 0) {
            dispatch(fetchTokens(`tokens?page=${page}&networks=${netName}`))
        } else {
            dispatch(clearTokens())
            dispatch(fetchTokens(`tokens?search=${tokensFilter}&networks=${netName}`))
        }
    }

    useEffect(() => {
        dispatch(resetChoosenTokens())
        dispatch(clearTokens())
        dispatch(fetchTokens(`tokens?page=${page}&networks=${netName}`))
    }, [net])

    useEffect(() => {
        setPage(0)
        setTokensFilter('')
    }, [net, show])

    useEffect(() => {
        updateTokens()
    }, [dispatch, page, net, tokensFilter])

    return {
        modal: (
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
                        {reduxTokens.length > 0 ? (
                            reduxTokens.map((token: TokensType) => (
                                <div key={token.key} className="single-token" onClick={() => handleSelectToken(token)}>
                                    <div className="token-image">
                                        {token.images ? (
                                            <img src={token.images[1]} loading="lazy"></img>
                                        ) : (
                                            <img src={token.image} loading="lazy"></img>
                                        )}
                                    </div>
                                    <div>
                                        <div className="token-name">{token.name}</div>
                                        <div className="token-symbol">{token.symbol}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="error">Results not found.</div>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        ),
        setShow
    }
}

export default useTokenModal
