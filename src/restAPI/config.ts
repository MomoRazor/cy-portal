import { logoutResponseInterceptor, requestInterceptor } from '@sector-eleven-ltd/se-react-toolkit'
import axios from 'axios'
import { IdTokenResult, getAuth } from 'firebase/auth'
import getConfig from 'next/config'

let fbToken: IdTokenResult | undefined

export const firebaseAuthHeaders = async () => {
    const firebaseAuth = getAuth()

    const user = firebaseAuth.currentUser

    if (user) {
        if (!fbToken || new Date(fbToken.expirationTime).getTime() < Date.now()) {
            fbToken = await user.getIdTokenResult(true)
        }

        return {
            authorization: `bearer ${fbToken.token}`
        }
    } else {
        return null
    }
}

const { publicRuntimeConfig } = getConfig()

const baseURL = publicRuntimeConfig?.baseUrl

export const axios11 = axios.create({
    baseURL: baseURL
})

axios11.interceptors.request.use(async (config) => {
    const authHeader = firebaseAuthHeaders()

    const header = await requestInterceptor(config, authHeader)
    return header
})

axios11.interceptors.response.use(
    (response) => {
        return response
    },
    (e) => logoutResponseInterceptor(e, undefined, '/logout')
)
