import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import {PeersProvider} from "./context/peers.jsx";

console.log(Pear);

const root = createRoot(document.getElementById('root'))
root.render(
	<PeersProvider>
		<App/>
	</PeersProvider>)