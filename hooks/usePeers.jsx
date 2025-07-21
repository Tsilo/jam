import {useContext} from 'react'
import {PeersContext} from '../context/peers.jsx'

export default () => {
	const context = useContext(PeersContext)
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider')
	}

	return context
}
