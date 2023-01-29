import { IFirebaseConfig } from '@sector-eleven-ltd/se-react-toolkit'
import getConfig from 'next/config'

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
