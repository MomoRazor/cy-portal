import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import {
    APICallResult,
    AuthContext,
    displaySnackbar,
    LoginPage,
    parseError,
    SnackbarContext,
    SnackbarType,
    ThemeContext
} from '@sector-eleven-ltd/se-react-toolkit'
import darkLogo from '../../public/LogoDarkTheme.png'
import whiteLogo from '../../public/LogoLightTheme.png'
import Image from 'next/image'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { hydrateDate } from '../auth'

export const Login = () => {
    const { addData } = useContext(SnackbarContext)
    const theme = useContext(ThemeContext)
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
            const result = await hydrateDate(firebaseUser.user)

            if (result.result === APICallResult.success) {
                auth.login && auth.login(result.data)
                router.push('/' + loggedInPage)
            } else if (result.result === APICallResult.denied) {
                displaySnackbar('User not found!', SnackbarType.error, addData)
            } else if (result.result === APICallResult.error) {
                displaySnackbar('Error Loading User!', SnackbarType.error, addData)
            }
        } catch (e) {
            console.error(e)
            displaySnackbar(parseError(e), SnackbarType.error, addData)
        }
    }

    return (
        <LoginPage
            title="Welcome to CAM Youths Portal"
            image={
                <Image
                    src={theme.selectedThemeNumber == 0 ? whiteLogo : darkLogo}
                    alt="Login Logo"
                />
            }
            onSignIn={handleEmailSignIn}
            forgotPassword={() => router.push('/forgotPassword')}
            onAutoLogin={() => router.push('/' + loggedInPage)}
        />
    )
}
