import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GameTracker from './components/GameTracker'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameTracker />
  </StrictMode>,
)
