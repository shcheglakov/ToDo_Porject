import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/home/Home'
import './index.css'
import { Provider } from './Provider'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider>
        <Home />
      </Provider>
    </StrictMode>
)
