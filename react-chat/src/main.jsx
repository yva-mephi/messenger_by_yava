import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'


import App from './App.jsx'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);