import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ContentProvider } from './content/index.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContentProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContentProvider>
  </React.StrictMode>,
)
