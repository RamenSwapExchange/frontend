import './useTokenModal.scss'
import { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import {
    chooseToken,
    clearTokens,
    fetchTokens,
    selectChoosenTokens,
    selectTokens,
    TokensType,
} from '../../../redux/tokensModalSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import useNet from '../../../common/useNet'

const useTokenModal = () => {
    const dispatch = useAppDispatch()
    const reduxTokens = useAppSelector(selectTokens)
    const choosenToknes = useAppSelector(selectChoosenTokens);
    const [tokensFilter, setTokensFilter] = useState('')

    const [show, setShow] = useState(false);
    const [tokenState, setTokenState] = useState<TokensType | null>(null)

    const [page, setPage] = useState(0)
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
        if (tokensFilter.length !== 0) return;
        handleScroll()
    }

    function handleSelectToken(token: TokensType) {
        if (token) {
            //todo redux
            dispatch(chooseToken({ token: token, id: 0 }))
            console.log(choosenToknes)
            setTokenState(token);
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
        modal:
            < Modal show={show} onHide={handleClose} className="tokens-modal" >
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
                                        {token.images ? <img src={token.images[1]}></img> : <img src={token.image}></img>}
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
            </Modal >,
        token: tokenState,
        setShow
    }
}

export default useTokenModal
