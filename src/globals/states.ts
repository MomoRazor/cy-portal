import { User } from 'firebase/auth'
import { createSignal } from 'solid-js'

export type AuthStatuses = `PENDING` | `AUTHENTICATED` | `UNAUTHENTICATED`

export const [user, setUser] = createSignal<undefined | User>(undefined)
export const [authStatus, setAuthStatus] = createSignal<AuthStatuses>(`PENDING`)
