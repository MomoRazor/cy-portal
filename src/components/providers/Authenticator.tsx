import { Show } from 'solid-js'
import { authStatus } from '../../globals'

export interface IAuthenticator {
    children: any
}

export const Authenticator = (props: IAuthenticator) => (
    <>
        <Show when={authStatus() === 'AUTHENTICATED'}>{props.children}</Show>
        <Show when={authStatus() === 'UNAUTHENTICATED'}>
            <p>Implement Reauthenticate</p>
        </Show>
    </>
)
