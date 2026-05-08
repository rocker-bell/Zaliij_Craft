import { createContext, useContext, useState } from "react";
import "../Styles/ModalContext.css";

import { Loader, Check, Ban } from "lucide-react";
 
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
            {modal.type === "loading" && <div className="spinner"><Loader size={30} /></div>}
            {modal.type === "success" && <div><Check size={30} /></div>}
            {modal.type === "error" && <div><Ban size={30} /></div>}

            <p>{modal.message}</p>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};