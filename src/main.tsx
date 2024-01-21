import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./styles/main-style.sass"
import "../public/fonts/index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
