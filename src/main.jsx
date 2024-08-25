import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { NextUIProvider as NextUi } from '@nextui-org/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/*' element={
          <NextUi>
            <App />
          </NextUi>
        }/>
      </Routes>
    </Router>
  </StrictMode>,
)
