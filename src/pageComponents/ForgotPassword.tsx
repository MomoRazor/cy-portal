import {
    displaySnackbar,
    ForgotPasswordPage,
    SnackbarContext,
    SnackbarType
} from '@sector-eleven-ltd/se-react-toolkit'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export const ForgotPassword = () => {
    const { addData } = useContext(SnackbarContext)
    const router = useRouter()

    const handleForgotButton = async (email: string) => {
        const firebaseAuth = getAuth()
        try {
            await sendPasswordResetEmail(firebaseAuth, email)
            displaySnackbar('Email Sent', SnackbarType.success, addData)
            router.push('/')
        } catch (e) {
            displaySnackbar('Error Sending Email', SnackbarType.error, addData)
        }
    }

    return <ForgotPasswordPage loginUrl="/" onForgot={handleForgotButton} />
}
