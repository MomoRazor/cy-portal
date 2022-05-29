import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { apiKey, appId, authDomain, messagingSenderId, projectId, storageBucket } from './env'
import { setAuthStatus, setUser } from './states'

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

auth.onAuthStateChanged((user) => {
    if (user) {
        setUser(user)
        setAuthStatus(`AUTHENTICATED`)
    } else {
        setUser(undefined)
        setAuthStatus(`UNAUTHENTICATED`)
    }
})
