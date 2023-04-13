import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { selectModal, selectTokens, showModal } from "../../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import "./tokensListModal.scss"

const TokensListModal = () => {

    const dispatch = useAppDispatch();
    const show = useAppSelector(selectModal);
    const tokens = useAppSelector(selectTokens);

    console.log(tokens);

    const handleClose = () => dispatch(showModal(false));

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
                />
                <div className="tokens-list">
                    {tokens.map((token) => (
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
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TokensListModal