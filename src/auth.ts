import { APICallResult, IFirebaseConfig } from '@sector-eleven-ltd/se-react-toolkit'
import getConfig from 'next/config'
import { User } from 'firebase/auth'
import { getUser } from './restAPI'

const { publicRuntimeConfig } = getConfig()

const apiKey = publicRuntimeConfig?.apiKey
const authDomain = publicRuntimeConfig?.authDomain
const projectId = publicRuntimeConfig?.projectId
const storageBucket = publicRuntimeConfig?.storageBucket
const messagingSender = publicRuntimeConfig?.messagingSender
const appId = publicRuntimeConfig?.appId
const measurementId = publicRuntimeConfig?.measurementId

export const firebaseConfig: IFirebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSender,
    appId: appId,
    measurementId: measurementId
}

export const hydrateDate = async (
    user: User | null
): Promise<{ result: APICallResult; data?: any }> => {
    if (user) {
        try {
            let data = null

            data = await getUser(user.uid)

            if (data) {
                return {
                    result: APICallResult.success,
                    data
                }
            } else {
                return {
                    result: APICallResult.denied
                }
            }
        } catch (e) {
            console.error(e)
            return {
                result: APICallResult.error
            }
        }
    } else {
        return {
            result: APICallResult.denied
        }
    }
}
