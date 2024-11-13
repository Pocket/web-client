import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import '../assets/fonts/fonts.css'
import './global.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
