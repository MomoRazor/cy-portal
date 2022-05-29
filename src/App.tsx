import type { Component } from 'solid-js'
import { Gateway, Loader } from './components'
import { endpoints } from './nav'

export const App: Component = () => (
    <Loader>
        <Gateway endpoints={endpoints} />
    </Loader>
)

export default App
