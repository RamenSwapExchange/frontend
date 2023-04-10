import "./swap.scss";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { AiOutlineArrowDown } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppSelector } from "../../redux/hooks";
import { selectTokens } from "../../redux/appSlice";

const Swap = () => {
  const tokens = useAppSelector(selectTokens);
  console.log(tokens);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="swap-container">
      <div className="swap-box">
        <div className="swap-top">
          <div>Swap</div>
          <div>
            <FiSettings className="settings-icon" />
          </div>
        </div>
        <div className="single-swap">
          <input type="text" placeholder="0" className="swap-input" />
          <button className="token-btn" onClick={handleShow}>
            MATIC
          </button>
        </div>
        <div className="single-swap">
          <input type="text" placeholder="0" className="swap-input" />
          <button className="token-btn">MATIC</button>
        </div>
        <button className="connect-button">Connect Wallet</button>
        <button className="swap-button">
          <AiOutlineArrowDown />
        </button>
      </div>

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
            {tokens.map((token) => {
              return (
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
              );
            })}
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
    </div>
  );
};

export default Swap;
