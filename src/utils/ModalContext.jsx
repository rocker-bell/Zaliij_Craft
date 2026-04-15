import { createContext, useContext, useState } from "react";
import "../Styles/ModalContext.css";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);

  const showModal = (type, message, duration = 6000) => {
    setModal({ type, message });

    setTimeout(() => {
      setModal(null);
    }, duration);
  };

  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}

      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className={`modal-box ${modal.type}`}
            onClick={(e) => e.stopPropagation()}
          >
            {modal.type === "loading" && <div className="spinner">⏳</div>}
            {modal.type === "success" && <div>✅</div>}
            {modal.type === "error" && <div>❌</div>}

            <p>{modal.message}</p>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};