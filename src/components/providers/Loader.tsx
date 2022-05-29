import { JSX, Show } from 'solid-js'
import { PropAliases } from 'solid-js/web'
import { authStatus } from '../../globals'
import { QuadSpinner } from '../QuadSpinner'

export interface ILoader {
    children: JSX.Element
}

export const Loader = (props: ILoader) => (
    <Show when={authStatus() === 'PENDING'} fallback={props.children}>
        <QuadSpinner />
    </Show>
)
