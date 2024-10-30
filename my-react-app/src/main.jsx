import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Entry from './pages/PageEntry/Entry.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Entry />
  </StrictMode>,
)
