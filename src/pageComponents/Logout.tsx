import { AuthContext, LoadingPage } from '@sector-eleven-ltd/se-react-toolkit'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect } from 'react'
import { getAuth } from 'firebase/auth'

export const Logout = () => {
    const router = useRouter()
    const { logout } = useContext(AuthContext)

    const logoutFn = useCallback(async () => {
        const firebaseAuth = getAuth()
        await firebaseAuth.signOut()
        logout && logout()
        router.push('/')
    }, [logout, router])

    useEffect(() => {
        if (logout && router.isReady) {
            logoutFn()
        }
    }, [logout, router, logoutFn])

    return <LoadingPage />
}
