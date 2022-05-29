import { Endpoint } from './components'
import { Login } from './pages'

export const endpoints: Endpoint[] = [
    {
        url: '/',
        component: <Login />
    },
    {
        url: '/test',
        component: <p>Test</p>
    }
]
