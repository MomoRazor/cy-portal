import { useRouter } from 'next/router'
import { useContext } from 'react'
import {
    AuthContext,
    displaySnackbar,
    LoginPage,
    parseError,
    SnackbarContext,
    SnackbarType
} from '@sector-eleven-ltd/se-react-toolkit'
import darkLogo from '../../public/logo_color_600px-no-bg.png'
import Image from 'next/image'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { loginUser } from '../restAPI'

export const Login = () => {
    const { addData } = useContext(SnackbarContext)
    const auth = useContext(AuthContext)

    const router = useRouter()

    const loggedInPage = 'profile'

    const handleEmailSignIn = async (email: string, password: string) => {
        const firebaseAuth = getAuth()

        if (email === '') {
            displaySnackbar('Email is required', SnackbarType.error, addData)
            return
        }

        if (password === '') {
            displaySnackbar('Password is required', SnackbarType.error, addData)
            return
        }

        try {
            const firebaseUser = await signInWithEmailAndPassword(firebaseAuth, email, password)

            if (firebaseUser.user) {
                const result = await loginUser()

                if (result.data) {
                    auth.login && auth.login(result.data)
                    router.push('/' + loggedInPage)
                } else {
                    displaySnackbar('Error Loading User!', SnackbarType.error, addData)
                }
            }
        } catch (e) {
            console.error(e)
            displaySnackbar(parseError(e), SnackbarType.error, addData)
        }
    }

    return (
        <LoginPage
            title="Welcome to the CAM Youths Portal"
            image={<Image src={darkLogo} alt="Login Logo" height={200} />}
            onSignIn={handleEmailSignIn}
            forgotPassword={() => router.push('/forgotPassword')}
            onAutoLogin={() => router.push('/' + loggedInPage)}
        />
    )
}
