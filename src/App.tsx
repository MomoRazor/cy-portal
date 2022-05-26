import type {Component} from 'solid-js'
import {FirebaseProvider, Gateway} from './components'
import {endpoints} from './nav'

export const App: Component = () => (
	<FirebaseProvider>
		<Gateway endpoints={endpoints} />
	</FirebaseProvider>
)

export default App
