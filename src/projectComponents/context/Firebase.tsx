import { Firestore, getFirestore } from '@firebase/firestore'
import { LoadingPage } from '@sector-eleven-ltd/se-react-toolkit'
import { Auth, getAuth } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../auth'
import { User, loginUser } from '../../restAPI'

type AuthStatus = `PENDING` | `LOGGED_IN` | `LOGGED_OUT`

interface IFirebaseContext<User> {
    auth?: Auth
    db?: Firestore

    user?: User
    setUser?: (newLoginInfo: User) => void
    status: AuthStatus
    setStatus?: (newLoginInfo: AuthStatus) => void
}

const defaultFirebaseContext: IFirebaseContext<User> = {
    status: `PENDING`,
    setStatus: () => {}
}

export const FirebaseContext = createContext<IFirebaseContext<User>>(defaultFirebaseContext)

export interface IFirebaseProvider {
    children?: any
}

export const FirebaseProvider = (props: IFirebaseProvider) => {
    const [user, setUser] = useState<User>()
    const [status, setStatus] = useState<AuthStatus>(defaultFirebaseContext.status)

    const [auth, setAuth] = useState<Auth>()
    const [db, setDb] = useState<Firestore>()

    useEffect(() => {
        if (!auth || !db) {
            if (!auth) {
                initializeApp(firebaseConfig)
                setAuth(getAuth())
            }
            if (!db) {
                setDb(getFirestore())
            }
            return
        } else {
            const subscriber = auth.onAuthStateChanged(async (authUser) => {
                if (!authUser) {
                    setStatus(`LOGGED_OUT`)
                    setUser(undefined)
                } else {
                    setStatus(`LOGGED_IN`)

                    const user = await loginUser()

                    setUser(user.data)
                }
            })
            return subscriber
        }
    }, [auth, db])

    return (
        <FirebaseContext.Provider
            value={{ ...defaultFirebaseContext, db, auth, user, setUser, status, setStatus }}
        >
            {status === 'PENDING' ? <LoadingPage /> : props.children}
        </FirebaseContext.Provider>
    )
}
