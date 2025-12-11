import './i18n'; // Import i18n config
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'  // 引入 Tailwind
import './styles/graph-theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
