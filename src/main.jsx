import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './login.jsx'
import Routing from './routing.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routing />
    <Login />
  </StrictMode>,
)
