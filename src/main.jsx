import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router-dom";

import './index.css'
import App from './App.jsx'

import { ModalProvider } from './utils/ModalContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ModalProvider>
        <App />
      </ModalProvider>
    </HashRouter>
  </StrictMode>
)