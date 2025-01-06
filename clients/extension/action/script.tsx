import React from 'react'
import ReactDOM from 'react-dom/client'
import '../public/styles/fonts.css'
import '../public/styles/global.css'
import { App } from './app'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
