import { useRouter } from 'next/router'
import { useContext } from 'react'
import {
    APICallResult,
    AuthContext,
    displaySnackbar,
    LoginPage,
    parseError,
    SnackbarContext,
    SnackbarType
} from '@sector-eleven-ltd/se-react-toolkit'
import darkLogo from '../../public/logo_color_600px-no-bg.png'
import Image from 'next/image'
//TODO renable this
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// import { hydrateDate } from '../auth'
import { mockUser } from '../mock'

export const Login = () => {
    const { addData } = useContext(SnackbarContext)
    const auth = useContext(AuthContext)

    const router = useRouter()

    const loggedInPage = 'profile'

    const handleEmailSignIn = async (email: string, password: string) => {
        //TODO renable this
        // const firebaseAuth = getAuth()

        if (email === '') {
            displaySnackbar('Email is required', SnackbarType.error, addData)
            return
        }

        if (password === '') {
            displaySnackbar('Password is required', SnackbarType.error, addData)
            return
        }

        try {
            //TODO renable this
            // const firebaseUser = await signInWithEmailAndPassword(firebaseAuth, email, password)
            // const result = await hydrateDate(firebaseUser.user)
            const result = {
                result: APICallResult.success,
                data: mockUser
            }

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
            title="Welcome to the CAM Youths Portal"
            image={<Image src={darkLogo} alt="Login Logo" />}
            onSignIn={handleEmailSignIn}
            forgotPassword={() => router.push('/forgotPassword')}
            onAutoLogin={() => router.push('/' + loggedInPage)}
        />
    )
}
