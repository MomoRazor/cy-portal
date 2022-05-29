import { Route, Routes } from 'solid-app-router'
import { JSX } from 'solid-js'
import { Authenticator } from './providers'

export interface Endpoint {
    url: string
    component: JSX.Element
    authed?: boolean
}

export interface IGateway {
    endpoints: Endpoint[]
}

export const Gateway = (props: IGateway) => (
    <Routes>
        {props.endpoints.map((endpoint) => (
            <Route
                path={endpoint.url}
                element={
                    endpoint.authed ? (
                        <Authenticator>{endpoint.component}</Authenticator>
                    ) : (
                        endpoint.component
                    )
                }
            />
        ))}
    </Routes>
)
