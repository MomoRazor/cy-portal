import { Gateway, Loader } from './components'
import { endpoints } from './nav'
import '@fontsource/roboto'
import './App.module.css'

export const App = () => (
    <Loader>
        <Gateway endpoints={endpoints} />
    </Loader>
)

export default App
