import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './style.css'

Pear.updates(() => Pear.reload())
const root = createRoot(document.getElementById('root'))
root.render(<App/>)